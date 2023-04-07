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
async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id);
  return res.json({ status: "SUCESS" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "SUCESS" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (!body || !body.firstname || !body.lastname || !body.email || !body.password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const result = await User.create({
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
  });
  return res.status(201).json({
    message: "User created successfully",
    id: result._id,
  });
}


module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
