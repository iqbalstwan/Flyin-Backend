const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routerNavigation = require("./src");
const socket = require("socket.io");

const app = express();
app.use(cors());

const http = require("http");
const server = http.createServer(app);
const io = socket(server);
io.on("connection", (socket) => {
  console.log("Socket.io Connect");
  socket.on("globalMessage", (data) => {
    io.emit("chatMessage", data);
  });
  socket.on("privateMessage", (data) => {
    socket.emit("chatMessage", data);
  });
  socket.on("broadcastMessage", (data) => {
    socket.broadcast.emit("chatMessage", data);
  });
  socket.on("welcomeMessage", (data) => {
    socket.emit("chatMessage", {
      username: "BOT",
      message: `Welcome back brader ${data.username}`,
    });
    //global
    // socket.broadcast.emit("chatMessage", {
    //   username: "BOT",
    //   message: `${data} has joined`,
    // });
    //spesific
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("chatMessage", {
      username: "BOT",
      message: `${data.username} has joined`,
    });
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typingMessage", data);
    //spesific in room typing
  });

  socket.on("roomMessage", (data) => {
    io.to(data.room).emit("chatMessage", data);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", routerNavigation);

server.listen(3000, () => {
  console.log(`Express app is listening on port: 3000`);
});
