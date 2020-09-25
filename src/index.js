const routes = require("express").Router();

const user = require("./routes/user");
const profile = require("./routes/profile");

routes.use("/user", user);
routes.use("/profile", profile);

module.exports = routes;
