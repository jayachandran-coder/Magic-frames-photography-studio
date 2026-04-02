require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ username }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update admin credentials
// @route   PUT /api/auth/update
// @access  Private (Admin)
const updateAdminCredentials = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (username) {
        // Check if username is already taken by another user
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
          return res.status(400).json({ message: 'Username is already taken' });
        }
        user.username = username;
      }
      if (password) {
        user.password = password; 
      }

      await user.save(); // password hashing hook will run automatically if modified

      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
        message: 'Credentials updated successfully'
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during update' });
  }
};

module.exports = { loginUser, updateAdminCredentials };
