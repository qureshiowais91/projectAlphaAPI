const express = require('express');
const auth = express.Router();
const user = require('../controllers/auth.js');
const asyncHandler = require("../middleware/asynchandler.js");

// Register route
auth.post('/auth/register', asyncHandler(user.register));

// Login route
auth.post('/auth/login', asyncHandler(user.login));

module.exports = { auth };
