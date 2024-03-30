const mongoose = require('mongoose');

const connectDB = async () => {
  try {

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
