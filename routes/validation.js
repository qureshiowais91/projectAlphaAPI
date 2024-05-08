const { sendOtp, validateOTP } = require('../controllers/validation');
const express = require('express');
const asyncHandler = require("../middleware/asynchandler")
const validation = express.Router();

validation.post('/resetpassword', sendOtp);
validation.post('/validateotp', asyncHandler(validateOTP));

module.exports = { validation };