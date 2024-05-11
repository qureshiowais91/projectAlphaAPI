const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const generateToken = require('../util/GenrateJWT.js');
const { sendOTP } = require('../util/welcomeMail.js');
const CustomError = require('../util/error.js');
// const checkForProfanity =require("../util/profanity.js");

// Define the register function
async function register(req, res) {
  const { email, password, phonenumber, role } = req.body;
  if (!email && !password && !phonenumber && !role) {
    throw new CustomError('Required Filed Missing', 200);
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError('User Already Exist', 200);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new CustomError(
      'Server Internal Error Try Again Or Contact Developer',
      200
    );
  }
  const newUser = await User.create({
    email,
    password: hashedPassword,
    phonenumber,
    role,
  });

  //  check for retured data and schema
  // if (!newUser) {
  //     throw new CustomError("Server Internal Error Try Again Or Contact Developer", 200);
  // }

  sendOTP(email).catch(console.error);

  const token = generateToken(
    { userId: newUser._id, email: email, role: role },
    { expiresIn: '1h' }
  );
  res
    .status(200)
    .json({ isAuth: true, token, message: 'Loggedin', role: role });
}

// Define the login function
async function login(req, res) {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new CustomError('Email or Password Missing', 200);
  }
  const user = await User.findOne({ email });
  // check user if exist
  if (!user) {
    throw new CustomError('User Not Found', 404);
  }

  // check if user valid
  if (!user.verified) {
    throw new CustomError('Contact Developer', 401);
  }

  // Validate Password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new CustomError('Invalid Creds', 401);
  }

  const token = generateToken(
    { userId: user._id, email: user.email, role: user.role },
    { expiresIn: '5h' }
  );
  res
    .status(200)
    .json({
      isAuth: true,
      token,
      message: 'Loggedin',
      role: user.role,
      _id: user._id,
    });
}

// Export all functions
module.exports = {
  register,
  login,
};
