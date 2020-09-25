const bcrypt = require("bcrypt");
const helper = require("../helper");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const qs = require("querystring");
const {
  getAllWorker,
  getAllUser,
  getUserCount,
  getUsersByName,
  getUserById,
  postUser,
  checkUser,
  checkKey,
  changePassword,
  getCountWorker,
} = require("../model/user");
const { postProfile } = require("../model/profile");

module.exports = {
  getAllUser: async (request, response) => {
    try {
      let { sort, page, limit } = request.query;
      if (sort === undefined || sort === null || sort === "") {
        sort = `user.user_id`;
      }
      if (page === undefined || page === null || page === "") {
        page = parseInt(1);
      } else {
        page = parseInt(page);
      }
      if (limit === undefined || limit === null || limit === "") {
        limit = parseInt(9);
      } else {
        limit = parseInt(limit);
      }
      let totalData = await getUserCount();
      let totalPage = Math.ceil(totalData / limit);
      let offset = page * limit - limit;
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await getAllUser(sort, limit, offset);
      return helper.response(
        response,
        200,
        "Success get Users",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  register: async (request, response) => {
    const { user_email, user_password, user_name, user_phone } = request.body;
    const salt = bcrypt.genSaltSync(8);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const checkEmail = await checkUser(request.body.user_email);
    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_phone,
      user_created_at: new Date(),
      user_status: 0,
    };
    try {
      if (checkEmail.length > 0) {
        return helper.response(response, 400, "Email is already registered");
      } else if (
        setData.user_phone.length < 10 ||
        setData.user_phone.length > 13
      ) {
        return helper.response(response, 400, "Invalid phone number");
      } else if (
        request.body.user_password.length < 8 ||
        request.body.user_password.length > 16
      ) {
        return helper.response(
          response,
          400,
          "Password must be 8-16 characters"
        );
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match");
      } else {
        const result = await postUser(setData);
        console.log(result);
        const setData2 = {
          user_id: result.id,
          profile_img: "blank-profile.jpg",
          profile_name: "",
          profile_telp: "",
          profile_desc: "",
          profile_created_at: new Date(),
        };
        const result2 = await postProfile(setData2);
        return helper.response(response, 200, "Success Register User");
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    if (
      request.body.user_email === undefined ||
      request.body.user_email === ""
    ) {
      return helper.response(response, 400, "Email must be filled");
    } else if (
      request.body.user_password === undefined ||
      request.body.user_password === ""
    ) {
      return helper.response(response, 400, "Password must be filled");
    }
    try {
      const checkDataUser = await checkUser(request.body.user_email);
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          request.body.user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          let payload = {
            user_id: checkDataUser[0].user_id,
            user_email: checkDataUser[0].user_email,
            user_name: checkDataUser[0].user_name,
            user_img: checkDataUser[0].user_img,
            user_phone: checkDataUser[0].user_phone,
            user_status: checkDataUser[0].user_status,
          };
          //   if (payload.user_status === 0) {
          //     return helper.response(
          //       response,
          //       400,
          //       "Your account is not activated"
          //     );
          //   } else {
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "30s" });
          payload = { ...payload, token };
          return helper.response(response, 200, "Success login", payload);
          //   }
        } else {
          return helper.response(response, 400, "Wrong password !");
        }
      } else {
        return helper.response(response, 400, "Email is not registered !");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
