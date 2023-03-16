const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());
app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
  });

  socket.on("order_created", (data, callback) => {
    console.log("order created", data);

    callback({
      status: "ok",
      message: `order placed  that will cost you $${data.order_cost}. click 99 to check out this order`,
    });
  });

  socket.on("order checked out", (checked_out_order, callback) => {
    console.log("order checked out", checked_out_order);

    callback({
      status: "ok",
      message:
        `your ${checked_out_order.order}` +
        ` has been checked out and user account debited`,
    });
  });

  socket.on("order history", (all_orders, callback) => {
    console.log("order history", all_orders);

    callback({
      status: "ok",
      message: `you ordered ${all_orders.order}`,
    });
  });

  socket.on("current order notification", (pending_order, callback) => {
    console.log("order history", pending_order);

    callback({
      status: "ok",
      message: `you ordered ${pending_order.order}`,
    });
  });

  socket.on("cancel order notification", (pending_order, callback) => {
    callback({
      status: "ok",
      message: ` ${pending_order.order} order has been  canceled`,
    });
  });

  socket.on("user joined", (name, callback) => {
    callback({
      status: "ok",
      message: ` welcome ${name} to shinobi chicken. i am XXIII and i am at your service, what do you want to do today?
      enter 1 if you want to place order,
      enter 99 if you want to check out order,
      enter 98 if you want to see your order history,
      enter 97 if you want to see your current history,
      enter 0 if you want to cancel your order.`,
    });
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
