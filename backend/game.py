import asyncio
import websockets
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, Aer, execute
import numpy as np

playerReg = None
envReg = None
obstacles = ["river", "bandits", "sickness"]
num_players = 0
MAX_MATERIALS = 3000
MAX_MEDICINE = 10


async def game_socket(websocket):
    num_players = await websocket.recv()
    print(f"<<< {num_players}")
    num_players = int(num_players)
    if num_players < 1 or num_players > 4:
        print("Invalid number of players")
        return
    

def handle_event(event, ws):
    if event == "river":
        river(ws)
    elif event == "bandits":
        bandits(ws)
    elif event == "mountain":
        mountain(ws)
    elif event == "sickness":
        sickness(ws)
    else:
        print("Invalid event")

# River event: |+> basis measurement with phase application to |1> if successful
def river(ws):
    MAX_RIVER = 1000
    ws.send("start_river")
    riverReg = QuantumRegister(1, 'river')
    oldRange = MAX_RIVER
    newRange = np.pi
    newValue = (((850) * newRange) / oldRange)
    qc = QuantumCircuit(riverReg, ClassicalRegister(1))
    qc.h(riverReg)
    qc.p(newValue, riverReg)
    qc.h(riverReg)
    
    qc.measure(riverReg, 0)
    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1000)
    counts = job.result().get_counts(qc)
    print(counts)
    passChance = counts["1"]
    ## Time to roll the quantum dice
    dice = qrng(1000)
    if dice <= passChance:
        ws.send("pass_river")
    else:
        ws.send("fail_river")
    

# Bandit event: Entanglement of players and bandit
def bandits(ws):
    ws.send("start_bandits")
    player_reg = QuantumRegister(1, 'player')
    bandit_reg = QuantumRegister(1, 'bandit')
    cr = ClassicalRegister(2)
    qc = QuantumCircuit(player_reg, bandit_reg, cr)
    
    # creating entangled bell state
    qc.h(player_reg)
    qc.cx(player_reg, bandit_reg)
    
    # applying phase shift to player 
        

# Sickness event: Superposition of all players, then measurement
def sickness(ws):
    ws.send("start_sickness")
    num_players = 4
    player_reg = QuantumRegister(num_players, 'player')
    medAlloc = np.random.randint(0, 10, num_players)
    medAlloc = [8, 10, 8, 10]
    output = QuantumRegister(1, 'output')
    cr = ClassicalRegister(num_players)
    qc = QuantumCircuit(player_reg, output, cr)
    qc.h(player_reg)
    qc.h(output)
    for i in range(num_players):
        if medAlloc[i] <= 0:
            continue
        theta = medAlloc[i] * np.pi / 10
        qc.p(theta, player_reg[i])
    qc.h(player_reg)
    
    qc.measure(player_reg, cr)
    
    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1000)
    counts = job.result().get_counts(qc)
    survChance = [0 for i in range(num_players)]
    for count in counts:
        for i in range(num_players):
            if count[i] == '1':
                survChance[i] += counts[count]
    
    survCount = 0;
    for i in range(num_players):
        surv = qrng(1000)
        if surv <= survChance[i]:
            print(f"player {i} has survived!")
            survCount += 1
        else:
            print(f"player {i} has fallen sick!")
    
    if survCount < num_players/2:
        ws.send("fail_sickness")
    else:
        ws.send("pass_sickness")
    
    
## Returns a random number between 1 and max, quantumly
def qrng(max):
    qc = QuantumCircuit(1, 1)
    qc.h(0)
    qc.measure(0, 0)
    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1024)
    counts = job.result().get_counts(qc)
    return int(counts[0]) / int(counts[1]) % max + 1  # +1 to make it 1 to max instead of 0 to max-1
    

async def main():
    async with websockets.serve(game_socket, "localhost", 8080):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
