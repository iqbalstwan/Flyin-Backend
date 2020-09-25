const router = require("express").Router();
const {
  getAllUser,
  loginUser,
  register,
  // forgotPassword,
  // changePassword,
  // activationEmail,
  // activationUser,
} = require("../controller/user");

router.get("/", getAllUser);
router.post("/login", loginUser);
router.post("/register", register);
// router.post("/register/email", activationEmail);
// router.post("/forgot", forgotPassword);
// router.patch("/change", changePassword);
// router.patch("/activate", activationUser);

module.exports = router;
