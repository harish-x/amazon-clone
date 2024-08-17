const express = require("express");
const multer = require('multer')
const path = require('path')

const upload = multer({storage: multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null,path.join(__dirname,'..','uploads/user'))
  }, filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})
})

const {
  registerUsers,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authenticate");
const router = express.Router();

router.route("/register").post(upload.single('avatar'),registerUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/update").put(isAuthenticatedUser,updateProfile)

//adimn
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles('admin'),getUser)
      .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
      .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

module.exports = router;
