const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { loginValidation } = require("../middleware/validation");
const jwt = require("jsonwebtoken");


const changePassword = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({ message: "ACCESS DENIED! AUTHENTICATION TOKEN REQUIRED!" });
    }

    const decoded = jwt.verify(token, "poiuytrewqmnbvcxz");
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "USER NOT FOUND!" });
    }

    if (!user.verified) {
      return res.status(400).send({ message: "USER NOT VERIFIED! PLEASE VERIFY YOUR ACCOUNT FIRST!" });
    }

    const { error } = loginValidation(req, res);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const oldPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!oldPasswordMatched) {
      return res.status(401).send({ message: "OLD PASSWORD DIDN'T MATCHED!" });
    } else {
      const newpass = await bcrypt.hashSync(req.body.password, 10);
      const data = await User.findOneAndUpdate({ _id: userId }, { $set: { password: newpass } })
      res.send(data)
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "SERVER ERROR!" });
  }
};

module.exports = changePassword;