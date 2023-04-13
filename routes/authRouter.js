const express = require("express");
const router = express.Router();
const {
    handleSignin, handleSignup, verifyToken, changePassword
} = require("../controllers/authController");

router.route("/signup").post(handleSignup);

router.route("/:id/verify/:token").get(verifyToken);

router.route("/signin").post(handleSignin);

router.route("/changepassword").put(changePassword);

module.exports = router;