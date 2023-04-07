const User = require("../models/userModel");

const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res.status(404).json({ message: "USER NOT FOUND!!!" });
    }
    return res.json({ allUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "USER NOT FOUND!!!" });
    }
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleUpdateUserById = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ status: "SUCCESS" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleDeleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "USER NOT FOUND!!!" });
    }
    return res.json({ status: "SUCCESS" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleCreateNewUser = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body ||
      !body.firstname ||
      !body.lastname ||
      !body.email ||
      !body.password
    ) {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
