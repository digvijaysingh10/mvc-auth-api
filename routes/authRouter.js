const express = require("express");
const router = express.Router();

const {
    handleSignin, handleSignup
} = require("../controllers/authController");

router.route("/signup").post(handleSignup);

router.route("/signin").post(handleSignin);

module.exports = router;