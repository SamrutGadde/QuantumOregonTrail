const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

function broadcastMessage(message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Handle incoming message here
    broadcastMessage(message)

    socket.send('Message received');
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
