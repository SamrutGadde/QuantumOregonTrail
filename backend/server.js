import WebSocket, { WebSocketServer } from "ws";
import { exec } from "child_process";

const wss = new WebSocketServer({ port: 8080 });

const rooms = {};

wss.on("connection", (ws) => {
  // ws.on('message', function message(data, isBinary) {
  //   wss.clients.forEach(function each(client) {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(data, { binary: isBinary });
  //     }
  //   });
  // });
  const uuid = ws._socket._handle.fd;

  function leave(room) {
    if (!rooms[room][uuid]) return;

    if (Object.keys(rooms[room]).length === 1) {
      delete rooms[room];
    } else {
      delete rooms[room][uuid];
    }
  }

  ws.on("message", (data) => {
    console.log(data);
    const { message, meta, room } = JSON.parse(data);

    if (meta === "join") {
      if (!rooms[room]) rooms[room] = {}; // create the room
      if (!rooms[room][uuid]) {
        rooms[room][uuid] = ws; // join the room
        console.log("joined room", room);
      }
    } else if (meta === "leave") {
      leave(room);
    } else if (!meta) {
      // send the message to all in the room
      Object.entries(rooms[room]).forEach(([, sock]) => sock.send({ message }));
    }

    ws.on("close", () => {
      // for each room, remove closed socket
      Object.keys(rooms).forEach((room) => {
        leave(room);
      });
    });
  });
});

exec("python backend/python/game.py", (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

console.log("Server started");
