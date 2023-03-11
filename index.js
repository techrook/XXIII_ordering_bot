const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");


const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  io.on("connection", (socket) => {
    console.log("client connected", socket.id);
    
    
    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id);
    });

    socket.on("order_created", (data, callback) => {
      console.log('order created', data)

      callback({
        status: "ok",
        message: `You order as been created and that will cost you $${data.order_cost}. you can click 99 to check out this order`
      });
    });

    socket.on("order checked out", (checked_out_order, callback) => {
      console.log('order checked out', checked_out_order)

      callback({
        status: "ok",
        message: `your ${checked_out_order.order}` + ` has been checked out and user account debited`
      });
    });

    socket.on("order history", (all_orders, callback) => {
      console.log('order history', all_orders)

      callback({
        status: "ok",
        message: `you ordered ${all_orders}`
      });
    });

});

server.listen(2323, () => {
    console.log("listening on *:2323");
  })