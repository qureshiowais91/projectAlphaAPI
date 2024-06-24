const express = require('express');
const profile = express.Router();
const {
  getProfile,
  getRelatedSchoolInfo,
  schoolpublicprofile,
} = require('../controllers/profile');

// Middlewares
const asyncHandler = require('../middleware/asynchandler');
const authorizeRoles = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');

profile.get(
  '/school/profile',
  authenticateToken,
  asyncHandler(getRelatedSchoolInfo)
);
profile.get('/user/profile', authenticateToken, asyncHandler(getProfile));
profile.get('/school', asyncHandler(schoolpublicprofile));

module.exports = { profile };
