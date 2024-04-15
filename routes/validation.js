const { sendOtp, validateOTP } = require('../controllers/validation');
const express = require('express');
const validation = express.Router();

validation.post('/resetpassword', sendOtp);
validation.post("/validateotp", validateOTP);

module.exports = { validation };
