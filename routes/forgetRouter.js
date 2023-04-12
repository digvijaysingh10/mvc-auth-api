const express = require("express");
const router = express.Router();
const { sendResetLink, verifyResetToken, updatePassword } = require("../controllers/forgetController");
const resetPassword = require("../controllers/resetPasswordController");


router.route("/reset").post(sendResetLink);


router.route("/:id/reset/:token").get(verifyResetToken).put(updatePassword);


router.route("/resetpassword").put(resetPassword)

module.exports = router;
