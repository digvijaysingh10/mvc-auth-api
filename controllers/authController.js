const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendMail = require("../controllers/emailVerify");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../middleware/validation");


const handleSignup = async (req, res) => {
    const { error } = registerValidation(req, res);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send({ message: "EMAIL ALREADY EXISTS!!!" });
    }
  
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex")
    }).save();
  
    const url = `http://localhost:3000/users/${user._id}/verify/${token.token}`;
  
    sendMail(req.body.email, url);
  
    res.status(201).send({ message: "EMAIL SENT TO YOUR ACCOUNT, PLEASE VERIFY TO REGISTER!" });
  
    try {
      const saveUser = await user.save();
      res.send({ user: user._id });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const handleSignin = async (req, res) => {
    const { error } = loginValidation(req, res);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "EMAIL DOES NOT EXIST!!!" });
    }
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send("INVALID PASSWORD!!!");
    }
  
    const token = jwt.sign({ _id: user._id }, "poiuytrewqmnbvcxz");
    res.header("auth-token", token).send(token);
    // return res.send({ message: "LOGIN SUCCESSFUL!" })
  };

  const verifyToken = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send({
                message: "INVALID LINK!!!"
            });
        }
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) {
            return res.status(400).send({ message: "INVALID LINK!!!" });
        }
        await User.updateOne({
            _id: user._id,
            verified: true
        });
        await token.remove()
        res.status(200).send({ message: "Email verified" })
    } catch (error) {
        res.status(500).send({
            message: "SERVER ERROR!"
        })
    }
}


module.exports = {
    handleSignin, handleSignup, verifyToken
}