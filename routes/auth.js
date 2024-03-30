const express = require('express');
const auth = express.Router();
const user = require('../controllers/auth.js');

// Register route
auth.post('/register', user.register);

// Login route
auth.post('/login', user.login);

module.exports = { auth };
