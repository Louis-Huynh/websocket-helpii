const express = require("express");
const PORT = process.env.PORT || 3001;
const server = express().listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
const { Server, CLOSING } = require("ws"); //ws server
const wss = new Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    let getData = JSON.parse(data);

    wss.clients.forEach(function each(client) {
      client.send(getData);
    });

    console.log(`message received: ${getData}`);
  });
});
