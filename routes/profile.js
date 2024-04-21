const express = require('express');
const profile = express.Router();
const authenticateToken = require("../middleware/authentication")
const { getProfile } = require('../controllers/profile');

profile.get('/profile', authenticateToken, getProfile);

module.exports = { profile };
