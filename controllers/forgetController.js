const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { sendMail } = require("../middleware/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../middleware/validation");

const forgetPassword = async (req, res) => {
    try {
        const { error } = loginValidation(req, res);
        if (error) {
            return res.status(400).send(error.details[0].message);
        };

        const emailExist = await User.findOne({ email: req.body.email });
        if (!emailExist) {
            return res.status(409).send({ message: "EMAIL DON'T EXISTS!!!" });
        }
        const resetToken = await new Token({
            userId: userInfo._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `http://localhost:8080/users/${user._id}/verify/${resetToken.token}`;
        await sendMail(req.body.email, "RESET LINK", url);
        res.status(201).send({ message: "RESET LINK SENT" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "EMAIL NOT SENT!!!" });
    }
};

const changePassword = async (req, res) => {
    const { id, token } = req.params;
    const resetToken = await Token.findOne({ userId: id, token });
    if (!resetToken) {
        return res.status(400).send({ error: "INVALID LINK!!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(id);
    user.password = hashedPassword,
    await user.save();
    await resetToken.deleteOne();

    return res.status(200).send({message:"PASSWORD CHANGED SUCCESSFULLY!!!"})

}

module.exports = {
    forgetPassword,
    changePassword
  };
  