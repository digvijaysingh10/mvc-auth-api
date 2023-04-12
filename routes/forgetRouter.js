const express = require("express");
const router = express.Router();
const { sendResetLink, verifyResetToken, updatePassword } = require("../controllers/forgetController");
const changePassword = require("../controllers/changeController");


router.route("/reset").post(sendResetLink);


router.route("/:id/reset/:token").get(verifyResetToken).put(updatePassword);


router.route("/changepassword").put(changePassword)

module.exports = router;
