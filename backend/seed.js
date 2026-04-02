require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const seedAdmin = async () => {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'magicpassword123';

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User '${username}' already exists. No need to seed.`);
      process.exit();
    }

    // Create a new admin user
    const adminUser = new User({
      username,
      password,
    });

    await adminUser.save();
    console.log(`Admin user '${username}' seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
