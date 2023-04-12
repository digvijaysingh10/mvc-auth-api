const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  oldPassword:{
    type: String,
  },
  verified: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    this.oldPassword = this.password;
  }

  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
