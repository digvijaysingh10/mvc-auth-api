const express = require("express");
const router = express.Router();

const {
    handleSignin, handleSignup, verifyToken
} = require("../controllers/authController");

router.route("/signup").post(handleSignup);

router.route("/:id/verify/:token").get(verifyToken);

router.route("/signin").post(handleSignin);


module.exports = router;