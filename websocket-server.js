const port = 8080 || process.env.port;

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: port });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    let getData = JSON.parse(data);
    console.log(getData.type);

    const sendMessage = () => {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          data.type = "chat";
          client.send(data);
          console.log(`Hi data: ${data}`);
        }
      });
    };

    switch (getData.type) {
      case "chat":
        sendMessage();
    }
  });
});
