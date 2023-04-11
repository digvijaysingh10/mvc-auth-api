const express = require("express");
const router = express.Router();
const {
    forgetPassword,
    changePassword
} = require("../controllers/forgetController");

router.route("/:id/reset/:token").get(forgetPassword);

router.route("/reset").post(changePassword);


module.exports = router;