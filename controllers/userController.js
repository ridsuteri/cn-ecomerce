// controllers/userController.js
const User = require("../models/userModel");
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
// Add a new user
exports.addUser = async (req, res) => {
  const { name, age } = req.body;
  const user = new User({ name, age });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
};
// Other functions (update, delete) can be added similarly
