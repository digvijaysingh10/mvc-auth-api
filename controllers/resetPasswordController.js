const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { loginValidation } = require("../middleware/validation");

const resetPassword = async (req, res) => {
  try {
    const { error } = loginValidation(req, res);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    const userId = req.user._id;
    const user = await User.findById(userId);
    const oldPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!oldPassword) {
      return res.status(404).send("PASSWORD DIDN'T MATCH!!!");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    await User.updateOne(
      { _id: userId },
      { password: hashedPassword }
    );
    res.status(200).send({ message: "PASSWORD CHANGED SUCCESSFULLY!!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "SERVER ERROR!!!" });
  }
};
