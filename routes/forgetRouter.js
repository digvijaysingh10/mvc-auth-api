const express = require("express");
const router = express.Router();
const { sendResetLink, verifyResetToken, updatePassword } = require("../controllers/forgetController");



router.route("/reset").post(sendResetLink);


router.route("/:id/reset/:token").get(verifyResetToken).put(updatePassword);




module.exports = router;
