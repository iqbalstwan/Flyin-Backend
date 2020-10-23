const connection = require("../config/mysql");

module.exports = {
  getAllUser: (sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getUserCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM user ",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getUsersByName: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user LEFT JOIN profile ON user.user_id = profile.user_id LEFT JOIN skill ON user.user_id = skill.user_id LEFT JOIN portfolio ON user.user_id = portfolio.user_id WHERE user_status = 1 AND user_role = 1 AND skill_name LIKE ? LIMIT ? OFFSET ?`,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.user_id,user.user_name,user.user_email,user.user_password,user.user_phone,user.lat,user.lng,user.user_created_at,user.user_status,profile_id,profile.profile_img,profile.profile_desc from user INNER JOIN profile ON user.user_id = profile.user_id where user.user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            result.map((value) => {
              delete value.user_password;
            });
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          resolve(new Error(error));
        }
      });
    });
  },
  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.user_id,user.user_name,user.user_email,user.user_password,user.user_phone,user.lat,user.lng,user.user_created_at,user.user_status,profile.profile_img,profile.profile_desc from user INNER JOIN profile ON user.user_id = profile.user_id where user.user_email = ?",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkKey: (keys) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_key = ?",
        keys,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  changePassword: (setData, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_email = ?",
        [setData, email],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_email: email,
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
  updateLng(lng, id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET lng = ? WHERE user_id = ?`,
        [lng, id],
        (error, data) => {
          !error ? resolve(data) : reject(error);
        }
      );
    });
  },
  updateLat(lat, id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET lat = ? WHERE user_id = ?`,
        [lat, id],
        (error, data) => {
          !error ? resolve(data) : reject(error);
        }
      );
    });
  },
};
