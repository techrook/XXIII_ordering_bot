const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  io.on("connection", (socket) => {
    console.log("client connected", socket.id);
    
    
    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id);
    });

    socket.on("order_created", (event) => {
      console.log('order created')
    });

});

server.listen(2323, () => {
    console.log("listening on *:2323");
  });