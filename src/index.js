const routes = require("express").Router();

const user = require("./routes/user");
const profile = require("./routes/profile");
const roomchat = require("./routes/roomchat");

routes.use("/user", user);
routes.use("/profile", profile);
routes.use("/roomchat", roomchat);

module.exports = routes;
