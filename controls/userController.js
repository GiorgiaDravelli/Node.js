const User = require("../models/userModel.js");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


// Create a new user
exports.createUser = async (req, res) => {
    try {
      const { name, surname, email } = req.body;
  
      if (!email || !emailRegex.test(email)) {
        throw new Error("Provide a valid email address.");
      }
      const newUser = new User({ name, surname, email });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to create the user." });
    }
  };
  
  // Get all users
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve users." });
    }
  };
  
  // Get a user by email
  exports.getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findByEmail(email);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Unable to find the user." });
    }
  };
  
  // Update a user by email
  exports.updateUser = async (req, res) => {
    try {
      const emailToUpdate = req.params.email;
      const update = req.body;
      const user = await User.findOne({ email: emailToUpdate });
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      if (update.name) {
        user.name = update.name;
      }
      if (update.surname) {
        user.surname = update.surname;
      }
      if (update.email) {
        if (!emailRegex.test(update.email)) {
          throw new Error("Email not provided correctly");
        }
        user.email = update.email;
      }
  
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Unable to update the user." });
    }
  };
  
  // Delete a user by email
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ email: req.params.email });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Unable to delete the user." });
      console.log(error.message)
    }
  };