const express = require('express');
const auth = express.Router();
const user = require('../controllers/auth.js');

// Register route
auth.post('/auth/register', user.register);

// Login route
auth.post('/auth/login', user.login);

module.exports = { auth };
