const User = require("../models/userModel");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "USER NOT FOUND!" });
  return res.json(user);
}
async function handleUpdateUserId(req, res) {
  await User.findByIdAndUpdate(req.params.id);
  return res.json({ status: "SUCESS" });
}

async function handleDeleteUserId(req, res) {
  await User.findByIdAndDelete(req.params.id, {
    lastName: "changed",
  });
  return res.json({ status: "SUCESS" });
}

async function hamdleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.firts_name ||
    !body.last_name ||
    !body.email ||
    !body.password
  ) {
    return res.status(404).json({
      message: "ALL FIELDS ARE REQUIRED!!!",
    });
  }
  const result = await User.create({
    firstName: body.firts_name,
    lastName: body.last_name,
    email: body.email,
    password: body.password,
  });
  return res.status(201).json({
    message: "SUCESS!",
    id: result._id,
  });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserId,
  handleDeleteUserId,
  hamdleCreateNewUser,
};
