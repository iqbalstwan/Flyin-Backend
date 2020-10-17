const router = require("express").Router();
const {
  addFriend,
  getFriend,
  getRoomMessage,
  getUserRoom,
  getAllUserRoom,
  postRoomChat,
  postMessage,
} = require("../controller/roomchat");

// router.get("/chat/notif", getNotificationById);

router.get("/myfriend/:id", getFriend);
router.get("/roomid/:id", getRoomMessage);
router.get("/roomuser", getUserRoom);
router.get("/getroom/:id", getAllUserRoom);

router.post("/add", addFriend);
router.post("/room/", postRoomChat);
router.post("/msg/", postMessage);

module.exports = router;
