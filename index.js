const express = require("express");
require("dotenv").config();
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
  // ====================================
  socket.on("setRoom", (data) => {
    socket.join(data.newRoom);
    console.log(`join room  + ${data.newRoom}`);
  });
  socket.on("changeRoom", (data) => {
    console.log(`join change room  + ${data.newRoom}`);
    socket.leave(data.oldRoom);
    socket.join(data.newRoom);
  });
  socket.on("roomyMsg", (data) => {
    io.to(data.roomchat_id).emit("chatFlyin", data);
    console.log(data);
  });
  // ======================================
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("uploads"));

app.use("/", routerNavigation);

server.listen(process.env.PORT, () => {
  console.log(`Express app is listening on port: ${process.env.PORT}`);
});
