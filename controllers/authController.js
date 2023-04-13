const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { sendMail } = require("../middleware/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");

//sign up controller

const handleSignup = async (req, res) => {
  try {
    const { error } = registerValidation(req, res);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(409).send({ message: "EMAIL ALREADY EXISTS!!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    }).save();

    const verificationToken = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `http://localhost:8080/users/${user._id}/verify/${verificationToken.token}`;

    await sendMail(req.body.email, "VERIFY TO REGISTER!", url);

    res.status(201).send({
      message: "EMAIL SENT TO YOUR ACCOUNT, PLEASE VERIFY TO REGISTER!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "EMAIL NOT SENT!" });
  }
};

//verify token

const verifyToken = async (req, res) => {
  const { id, token } = req.params;

  const verificationToken = await Token.findOne({ userId: id, token });

  if (!verificationToken) {
    return res.status(400).json({ error: "INVALID VERIFICATION LINK!!!" });
  }

  const user = await User.findById(id);
  user.verified = true;
  await user.save();
  await verificationToken.deleteOne();

  return res.send(
    `<h1>Account verified successfully!</h1>
    <script>
    window.setTimeout(() => 
    { window.location.href = "http://localhost:3000/signin"; }, 3000);
    </script>`
  );
};

//sign in
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

  if (!user.verified) {
    return res.status(404).send({ message: "USER NOT VERIFIED!!!" });
  }

  const token = jwt.sign({ _id: user._id }, "poiuytrewqmnbvcxz");
  res.header("auth-token", token).send(token);
};

const authenticate = async (req, res, next) => {
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
    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "SERVER ERROR!" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { error } = loginValidation(req, res);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const oldPasswordMatched = await bcrypt.compare(req.body.oldPassword, req.user.password);
    if (!oldPasswordMatched) {
      return res.status(401).send({ message: "OLD PASSWORD DIDN'T MATCHED!" });
    } else {
      const newpass = await bcrypt.hashSync(req.body.password, 10);
      const data = await User.findOneAndUpdate({ _id: req.user._id },
        { $set: { password: newpass } })
      res.send(data)
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "SERVER ERROR!" });
  }
};


module.exports = {
  handleSignin,
  handleSignup,
  verifyToken,
  authenticate,
  changePassword
};
