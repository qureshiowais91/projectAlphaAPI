const {
  sendOtp,
  validateOTP,
  resetpassword,
} = require('../controllers/validation');
const express = require('express');
const asyncHandler = require('../middleware/asynchandler');
const validation = express.Router();

validation.post('/resetpassword', sendOtp);
validation.post('/validateotp', asyncHandler(validateOTP));
validation.post('/reset', asyncHandler(resetpassword));

module.exports = { validation };
