from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, Aer, execute
import numpy as np
import math

def river(ws):
    riverReg = QuantumRegister(1, 'river')
    oldRange = 1000
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
    passChance = counts["1"] / 1000
    print(passChance) 

# Sickness event: Superposition of all players, then measurement
def sickness(ws):
    num_players = 4
    player_reg = QuantumRegister(num_players, 'player')
    medAlloc = np.random.randint(0, 10, num_players)
    medAlloc = [8, 6, 8, 8]
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
    for i in range(num_players):
        surv = qrng(1000)
        if surv <= survChance[i]:
            print(f"player {i} has survived")
        else:
            print(f"player {i} has died of dysentery")

# Bandit event: Entanglement of players and bandit
# Goal is to keep bandit in |0> state and player in |1> state
def bandits(ws):
    # ws.send("start_bandits")
    player_reg = QuantumRegister(1, 'player')
    bandit_reg = QuantumRegister(1, 'bandit')
    cr = ClassicalRegister(2)
    qc = QuantumCircuit(player_reg, bandit_reg, cr)

    # creating entangled bell state between player and bandit
    qc.h(player_reg)
    qc.cx(player_reg, bandit_reg)
    
    # apply phase shift to player
    qc.p(np.pi/2, player_reg)
    qc.rx(np.pi/2, player_reg)
    
    qc.cx(player_reg, bandit_reg)
    qc.h(player_reg)
    
    
    # Bell state measurement
    qc.measure(player_reg, 0)
    qc.measure(bandit_reg, 1)

    backend = Aer.get_backend('qasm_simulator')
    job = execute(qc, backend, shots=1000)
    counts = job.result().get_counts(qc)
    print(counts)

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

bandits(None)