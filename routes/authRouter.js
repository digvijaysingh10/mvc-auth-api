const express = require("express");
const router = express.Router();
const {
    handleSignin, handleSignup, verifyToken, handleChangePassword
} = require("../controllers/authController");

router.route("/signup").post(handleSignup);

router.route("/:id/verify/:token").get(verifyToken);

router.route("/signin").post(handleSignin);

router.route("/changepassword").put(handleChangePassword);

module.exports = router;