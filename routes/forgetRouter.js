const express = require("express");
const router = express.Router();
const { sendResetLink, verifyResetToken, updatePassword } = require("../controllers/forgetController");

// Send reset link
router.route("/reset").post(sendResetLink);

// Verify reset token
router.route("/:id/reset/:token").get(verifyResetToken);

// Update password
router.route("/:id/update/:token").put(updatePassword);

module.exports = router;
