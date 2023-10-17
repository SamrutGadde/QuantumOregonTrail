import asyncio
import websockets
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, Aer, execute
import numpy as np
import math
import json

obstacles = ["river", "bandits", "sickness"]
OBSTACLE_NUM = 5
MAX_MATERIALS = 1000
MAX_CURRENCY = 1000
MAX_MEDICINE = 50
MAX_MED_ALLOC = 5
MAX_MAT_ALLOC = 300
MAX_CUR_ALLOC = 300


async def game_socket(websocket):
    print("Game socket connected, waiting for start signal")
    message = await websocket.recv()
    message = json.loads(message)
    print(f"<<< {message['message']}")
    materials = message['materials']
    currency = message['currency']
    medicine = message['medicine']
    print(f"Materials: {materials}, Currency: {currency}, Medicine: {medicine}")
    num_players = 4
    if num_players < 1 or num_players > 4:
        print("Invalid number of players")
    
    # Generate obstacles for this game
    gameObstacles = []
    for i in range(OBSTACLE_NUM):
        gameObstacles.append(obstacles[np.random.randint(0, 3)])
    # gameObstacles = ["river", "bandits", "sickness"]
    print(f"Obstacles: {gameObstacles}")
        
    for obstacle in gameObstacles:
        message = await handle_event(obstacle, websocket, message)
    
    ## if player made it here, they win
    message['message'] = "win"
    await websocket.send(json.dumps(message))
    print("Game finished")
    
    # await websocket.recv() # wait for player to confirm game end
    return
    

async def handle_event(event, ws, message):
    status = ""
    if event == "river":
        status = await river(ws, message)
    elif event == "bandits":
        status = await bandits(ws, message)
    elif event == "sickness":
        status = await sickness(ws, message)
    else:
        print("Invalid event")
        
    print(f"Event {event} finished")
    message = json.loads(await ws.recv())
    print(f"<<< {message}")
    return message

# River event: superposition with phase application to |1> if successful
async def river(ws, message):
    print("start_river")
    message['message'] = "start_river"
    materials = message['materials']
    await ws.send(json.dumps(message))
    riverReg = QuantumRegister(1, 'river')
    oldRange = MAX_MAT_ALLOC
    newRange = np.pi
    raw = await ws.recv();
    message = json.loads(raw)
    materialsUsed = materials - message['materials']
    if (materialsUsed < 0):
        print("Invalid materials used")
        return
    newValue = (((materialsUsed) * newRange) / oldRange)
    qc = QuantumCircuit(riverReg, ClassicalRegister(1))
    qc.h(riverReg)
    qc.p(newValue, riverReg)
    qc.h(riverReg)
    
    qc.measure(riverReg, 0)
    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1000)
    counts = job.result().get_counts(qc)
    print(counts)
    passChance = counts["1"] if "1" in counts else 0
    ## Time to roll the quantum dice
    dice = qrng(1000)
    if dice <= passChance:
        message['message'] = "pass_river"
    else:
        message['message'] = "fail_river"
    
    await ws.send(json.dumps(message))
    return message

# Bandit event: Entanglement of players and bandit
# Goal is to put bandit and player in |1> state
async def bandits(ws, message):
    print("start_bandits", message)
    message['message'] = "start_bandits"
    materials = message['materials']
    currency = message['currency']
    medicine = message['medicine']
    await ws.send(json.dumps(message))
    player_reg = QuantumRegister(1, 'player')
    bandit_reg = QuantumRegister(1, 'bandit')
    oldCurrencyRange = MAX_CUR_ALLOC
    newCurrencyRange = np.pi
    oldMaterialsRange = MAX_MAT_ALLOC
    newMaterialsRange = np.pi/2
    oldMedicineRange = MAX_MED_ALLOC
    newMedicineRange = np.pi/2
    raw = await ws.recv();
    message = json.loads(raw)
    currencyUsed = currency - message['currency']
    materialsUsed = materials - message['materials']
    medicineUsed = medicine - message['medicine']
    if (currencyUsed < 0 or materialsUsed < 0 or medicineUsed < 0):
        print("Invalid materials used")
        return
    newCurrencyValue = (((currencyUsed) * newCurrencyRange) / oldCurrencyRange)
    newMaterialsValue = (((materialsUsed) * newMaterialsRange) / oldMaterialsRange)
    newMedicineValue = (((medicineUsed) * newMedicineRange) / oldMedicineRange)
    cr = ClassicalRegister(2)
    qc = QuantumCircuit(player_reg, bandit_reg, cr)

    # creating entangled bell state between player and bandit
    qc.h(player_reg)
    qc.cx(player_reg, bandit_reg)
    
    # apply phase shift to player
    qc.p(newCurrencyValue, player_reg) # currency
    qc.rx(newMaterialsValue + newMedicineValue, player_reg) # materials and medicine
    
    qc.cx(player_reg, bandit_reg)
    qc.h(player_reg)
    
    
    # Bell state measurement
    qc.measure(player_reg, 0)
    qc.measure(bandit_reg, 1)

    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1000)
    counts = job.result().get_counts(qc)
    print(counts)
    
    passChance = counts["11"] if "11" in counts else 0
    ## Time to roll the quantum dice
    dice = qrng(1000)
    if dice <= passChance:
        message['message'] = "pass_bandits"
    else:
        message['message'] = "fail_bandits"
    
    await ws.send(json.dumps(message))
    return message

# Sickness event: Superposition of all players, then measurement
async def sickness(ws, message):
    print("start_sickness")
    message['message'] = "start_sickness"
    medicine = message['medicine']
    await ws.send(json.dumps(message))
    num_players = 4
    player_reg = QuantumRegister(num_players, 'player')
    message = json.loads(await ws.recv())
    medAlloc = []
    medAlloc.append(int(message['player1']))
    medAlloc.append(int(message['player2']))
    medAlloc.append(int(message['player3']))
    medAlloc.append(int(message['player4']))
    # medAlloc = np.random.randint(0, 10, num_players)
    # medAlloc = [8, 10, 8, 10]
    output = QuantumRegister(1, 'output')
    cr = ClassicalRegister(num_players)
    qc = QuantumCircuit(player_reg, output, cr)
    qc.h(player_reg)
    qc.h(output)
    for i in range(num_players):
        if medAlloc[i] <= 0:
            continue
        theta = medAlloc[i] * np.pi / MAX_MED_ALLOC
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
        message['message'] = "fail_sickness"
    else:
        message['message'] = "pass_sickness"
    
    await ws.send(json.dumps(message))
    return message    
    
## Returns a random number between 1 and max, quantumly
def qrng(max):
    bits = int(math.log(max, 2)) + 1
    qr = QuantumRegister(bits, 'qr')
    cr = ClassicalRegister(bits)
    qc = QuantumCircuit(qr, cr)
    qc.h(qr)
    qc.measure(qr, cr)
    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1)
    counts = job.result().get_counts(qc)
    int_counts = {}
    for bitstring in counts:
        int_counts[int(bitstring,2)] = counts[bitstring]
    return int(list(int_counts.keys())[0])

async def main():
    async with websockets.serve(game_socket, "localhost", 8080):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
