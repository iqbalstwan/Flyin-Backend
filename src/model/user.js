const connection = require("../config/mysql");

module.exports = {
  getAllWorker: (sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user JOIN profile ON user.user_id = profile.user_id WHERE user.user_status = 1 AND user.user_role = 1 ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          if (!error) {
            result.map((value) => {
              delete value.user_password;
              delete value.user_key;
            });
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getCountWorker: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as total FROM user JOIN profile ON user.user_id = profile.user_id WHERE user.user_status = 1 AND user.user_role = 1 ${sort}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
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
        "SELECT * FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            result.map((value) => {
              delete value.user_password;
              delete value.user_key;
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
        "SELECT * FROM user WHERE user_email = ?",
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
};
