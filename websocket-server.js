const express = require("express");

const PORT = process.env.PORT || 8080;
const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const { Server } = require("ws");

const wss = new Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    let getData = JSON.parse(data);

    const sendMessage = () => {
      wss.clients.forEach(function each(client) {
        client.send(data);
      });
    };

    switch (getData.type) {
      case "chat":
        sendMessage();
    }
  });
});
