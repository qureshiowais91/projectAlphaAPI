const { sendOtp } = require('../controllers/validation');
const express = require('express');
const validation = express.Router();

validation.post('/test', sendOtp);

module.exports = { validation };
