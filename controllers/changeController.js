const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const { loginValidation } = require("../validations/authValidation");
const { auth } = require("../middleware/verifyToken");

const handleChangePassword = async (req, res) => {
  try {
    const { error } = loginValidation(req, res);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ message: "USER NOT FOUND!" });
    }

    const oldPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!oldPasswordMatched) {
      return res.status(401).send({ message: "OLD PASSWORD DID NOT MATCH!" });
    }

    const salt = await bcrypt.genSalt(10);
    const newpass = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.findByIdAndUpdate(userId, { password: newpass }, { new: true });
    res.send(updatedUser);

  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ message: "INVALID TOKEN! PLEASE LOGIN AGAIN!" });
    }
    return res.status(500).send({ message: "SERVER ERROR!" });
  }
};

module.exports = {
  handleChangePassword: [auth, handleChangePassword]
};
