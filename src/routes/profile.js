const router = require("express").Router();
const {
  getAllProfile,
  getProfileById,
  patchProfile,
  patchImageProfile,
  //   deleteProfile,
} = require("../controller/profile");
const uploadImage = require("../middleware/multer");

router.get("/", getAllProfile);
router.get("/:id", getProfileById);

router.patch("/:id", patchProfile);
router.patch("/:id", uploadImage, patchImageProfile);

// router.delete("/:id", deleteProfile);

module.exports = router;
