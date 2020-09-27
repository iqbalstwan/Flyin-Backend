const {
  addFriend,
  getUserByEmail,
  getAllFriend,
  checkRoom,
  checkRoomById,
  getMessageByUserId,
  getNotificationById,
  postRoomChat,
  postMessage,
  postNotification,
} = require("../model/roomchat");

const { getUserById } = require("../model/user");

const helper = require("../helper/index");
const { request, response } = require("express");

module.exports = {
  addFriend: async (request, response) => {
    const { user_id, friend_email } = request.body;
    try {
      const result = await getUserByEmail(friend_email);
      const setData = {
        user_id,
        friend_id: result[0].user_id,
      };
      const result2 = await addFriend(setData);
      return helper.response(response, 200, "Success add your friend", result2);
    } catch (error) {
      console.log(error);
      return helper.response(response, 404, "Failed", error);
    }
  },
  getFriend: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getAllFriend(id);
      return helper.response(response, 200, "Success get all friends", result);
    } catch (error) {
      return helper.response(response, 404, "Failed", error);
    }
  },
  postMessage: async (request, response) => {
    const { user_id, friend_id, roomchat_id, msg } = request.body;
    if (msg === "") {
      return helper.response(response, 400, "Input Your Message");
    } else if (user_id === friend_id) {
      return helper.response(response, 400, "Failed");
    }
    try {
      const getRoom = await checkRoomById(roomchat_id);
      const setData = {
        roomchat_id: getRoom[0].roomchat_id,
        user_id,
        friend_id,
        msg,
      };
      const result = await postMessage(setData);
      return helper.response(response, 200, "Success send message", result);
    } catch (error) {
      console.log(error);
      return helper.response(response, 404, "Failed", error);
    }
  },
  getRoomMessage: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await checkRoomById(id);
      if (result.length > 0) {
        const getData = await getMessageByUserId(id);

        for (i = 0; i < getData.length; i++) {
          const getSender = await getUserById(getData[i].user_id);
          getData[i].sender = getSender[0].user_name;
        }

        result[0].messages = getData;
        return helper.response(
          response,
          200,
          `Success get room chat by ID ${id}`,
          result
        );
      } else {
        return helper.response(response, 404, "Room chat is not found!");
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 404, "Failed", error);
    }
  },

  //   getNotificationById: async (request, response) => {
  //     try {
  //       const { user_id } = request.body;
  //       const result = await getNotificationById(user_id);
  //       if (result.length > 0) {
  //         return helper.response(
  //           response,
  //           200,
  //           "Succes get Notification By User Id",
  //           result
  //         );
  //       } else {
  //         return helper.response(
  //           response,
  //           404,
  //           `Notification By Id : ${user_id} Not Found`
  //         );
  //       }
  //     } catch (error) {
  //       return helper.response(response, 400, "Bad Request", error);
  //     }
  //   },

  postRoomChat: async (request, response) => {
    const { user_id, friend_id } = request.body;
    try {
      const check = await checkRoom(user_id, friend_id);
      const IdRoom = Math.round(Math.random() * 100000);
      const setData = {
        roomchat_id: IdRoom,
        user_id,
        friend_id,
      };
      const setData2 = {
        roomchat_id: IdRoom,
        user_id: friend_id,
        friend_id: user_id,
      };
      const createRoomChat = await postRoomChat(setData);
      await postRoomChat(setData2);
      return helper.response(
        response,
        200,
        "Success create room chat",
        createRoomChat
      );
    } catch (error) {
      console.log(error);
      return helper.response(response, 404, "Failed", error);
    }
  },

  //   postMessage: async (request, response) => {
  //     try {
  //       const { roomchat_id, user_id, msg } = request.body;
  //       const setData = {
  //         roomchat_id,
  //         user_id,
  //         msg,
  //         msg_created_at: new Date(),
  //       };
  //       const setData2 = {
  //         roomchat_id,
  //         user_id,
  //         notif: "You've got a New Message",
  //         notif_created_at: new Date(),
  //       };
  //       if (setData.roomchat_id === "") {
  //         return helper.response(response, 404, ` Input roomchat id`);
  //       } else if (setData.user_id === "") {
  //         return helper.response(response, 404, ` Input user id`);
  //       } else if (setData.msg === "") {
  //         return helper.response(response, 404, ` Input message`);
  //       } else {
  //         const result = await postMessage(setData);
  //         const notification = await postNotification(setData2);
  //         return helper.response(response, 201, "Message Created", result);
  //       }
  //     } catch (error) {
  //       return helper.response(response, 400, "Bad Request", error);
  //     }
  //   },
};
