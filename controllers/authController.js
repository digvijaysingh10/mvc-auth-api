const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendMail = require("../controllers/emailVerify");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../middleware/validation");

const handleSignup = async (req, res) => {
    const { error } = registerValidation(req, res)
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({ message: "EMAIL ALREADY EXIST!!!" });

    };

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const token = await new Token({
        
    })

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (error) { res.status(400).send(error) }
};
const handleSignin = async (req, res) => {
    const { error } = loginValidation(req, res)
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({ message: "EMAIL DOES NOT EXIST!!!" });
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(404).send("INVALID PASSWORD!!!")
    }
    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header("auth-token", token).send(token);
    return res.send({ message: "LOGIN SUCCESSFUL!" })
};

module.exports = {
    handleSignin, handleSignup
}