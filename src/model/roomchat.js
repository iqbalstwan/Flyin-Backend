const connection = require("../config/mysql");

module.exports = {
  addFriend: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO friend SET ?`, setData, (error, data) => {
        !error ? resolve(data) : reject(new Error(error));
      });
    });
  },
  getAllFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT friend.friend_id, user.user_name,user.user_phone, profile.profile_desc,profile.profile_img FROM friend JOIN user ON friend.friend_id = user.user_id  JOIN profile ON friend.friend_id = profile.user_id WHERE friend.user_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE user_email = '${email}'`,

        (error, data) => {
          !error ? resolve(data) : reject(new Error(error));
        }
      );
    });
  },
  checkRoom: (user_id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM roomchat WHERE user_id = ? AND friend_id = ?`,
        [user_id, friend_id],
        (error, data) => {
          !error ? resolve(data) : reject(new Error(error));
        }
      );
    });
  },
  checkRoomById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM roomchat WHERE roomchat_id = ?`,
        id,
        (error, data) => {
          !error ? resolve(data) : reject(new Error(error));
        }
      );
    });
  },

  getMessageByUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM messages WHERE roomchat_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getMessageChatByRoom: (roomId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM messages WHERE roomchat_id = ?",
        roomId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getRoomChatById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM roomchat LEFT JOIN user ON roomchat.user_id = user.user_id WHERE roomchat.user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getNotificationById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM notification LEFT JOIN user ON notification.user_id = user.user_id WHERE notification.user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postRoomChat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO roomchat SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  postMessage: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO messages SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              msg_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  postNotification: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO notification SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              notif_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
