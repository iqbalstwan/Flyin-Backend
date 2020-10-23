const router = require("express").Router();
const {
  getAllProfile,
  getProfileById,
  patchProfile,
  patchImageProfile,
  deleteImg,
  mapPosition,
  //   deleteProfile,
} = require("../controller/profile");
const uploadImage = require("../middleware/multer");

router.get("/", getAllProfile);
router.get("/:id", getProfileById);

router.patch("/:id", patchProfile);
router.patch("/update-map/:id", mapPosition);
router.patch("/patchimg/:id", uploadImage, patchImageProfile);
router.delete("/deleteimg/:id", deleteImg);

// router.delete("/:id", deleteProfile);

module.exports = router;
