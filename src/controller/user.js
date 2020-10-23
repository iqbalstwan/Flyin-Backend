const bcrypt = require("bcrypt");
const helper = require("../helper");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const qs = require("querystring");
const {
  getAllUser,
  getUserCount,
  getUsersByName,
  getUserById,
  postUser,
  checkUser,
  checkKey,
  changePassword,
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
  getUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getUserById(id);
      return helper.response(response, 200, "Get Product Success", result);
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
      user_key: 0,
      lat: 0,
      lng: 0,
    };
    try {
      if (checkEmail.length > 0) {
        return helper.response(response, 400, "Email is already registered");
      } else if (!user_email.match("@")) {
        return helper.response(response, 400, "Invalid,Missing Character('@')");
      } else if (
        setData.user_phone.length < 10 ||
        setData.user_phone.length > 12
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
            profile_img: checkDataUser[0].profile_img,
            profile_desc: checkDataUser[0].profile_desc,
            user_phone: checkDataUser[0].user_phone,
            lat: checkDataUser[0].lat,
            lng: checkDataUser[0].lng,
            user_status: checkDataUser[0].user_status,
          };
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" });
          payload = { ...payload, token };
          return helper.response(response, 200, "Success login", payload);
        } else {
          return helper.response(response, 400, "Wrong password !");
        }
      } else {
        return helper.response(response, 400, "Email is not registered !");
      }
    } catch (error) {
      console.log(error);

      return helper.response(response, 400, "Bad Request");
    }
  },
  changePassword: async (request, response) => {
    try {
      const { keys } = request.query;
      const { user_password } = request.body;
      const checkDataUser = await checkKey(keys);
      if (
        request.query.keys === undefined ||
        request.query.keys === null ||
        request.query.keys === ""
      ) {
        return helper.response(response, 400, "Invalid Key");
      }
      if (checkDataUser.length > 0) {
        const email = checkDataUser[0].user_email;
        let setData = {
          user_key: keys,
          user_password,
          user_updated_at: new Date(),
        };
        const difference =
          setData.user_updated_at - checkDataUser[0].user_updated_at;
        const minutesDifference = Math.floor(difference / 1000 / 60);
        if (minutesDifference > 5) {
          const data = {
            user_key: 0,
            user_updated_at: new Date(),
          };
          await changePassword(data, email);
          return helper.response(response, 400, "Key has expired");
        } else if (
          request.body.user_password === undefined ||
          request.body.user_password === null ||
          request.body.user_password === ""
        ) {
          return helper.response(response, 400, "Password must be filled !");
        } else if (
          request.body.confirm_password === undefined ||
          request.body.confirm_password === null ||
          request.body.confirm_password === ""
        ) {
          return helper.response(
            response,
            400,
            "Confirm Password must be filled !"
          );
        } else if (
          request.body.user_password.length < 8 ||
          request.body.user_password.length > 16
        ) {
          return helper.response(
            response,
            400,
            "Password must be 8-16 characters"
          );
        } else if (
          request.body.confirm_password !== request.body.user_password
        ) {
          return helper.response(response, 400, "Password didn't match");
        } else {
          const salt = bcrypt.genSaltSync(10);
          const encryptPassword = bcrypt.hashSync(user_password, salt);
          setData.user_password = encryptPassword;
          setData.user_key = 0;
        }
        const result = await changePassword(setData, email);
        return helper.response(
          response,
          200,
          "Success Password Updated",
          result
        );
      } else {
        return helper.response(response, 404, `Invalid key`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { user_email } = request.body;
      const keys = Math.round(Math.random() * 100000);
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        const data = {
          user_key: keys,
          user_updated_at: new Date(),
        };
        await changePassword(data, user_email);
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "oriza.sativa.matang@gmail.com",
            pass: "Oriza.sativa8",
          },
        });
        await transporter.sendMail({
          from: '"Flyin"',
          to: user_email,
          subject: "Flyin - Forgot Password",
          html: `<a href="http://localhost:8081/change?keys=${keys}">Click Here To Change Password</a>`,
        }),
          function (error) {
            if (error) {
              return helper.response(response, 400, "Email not sent !");
            }
          };
        return helper.response(response, 200, "Email has been sent !");
      } else {
        return helper.response(response, 400, "Email is not registered !");
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
