const express = require('express');
const staff = express.Router();
const { createAttendance } = require('../controllers/staffAttendace');
const authenticateToken = require('../middleware/authentication');
const authorizeRoles = require('../middleware/authorization');

staff.post(
  '/staff/attendance',
  authenticateToken, // Ensure this middleware is defined and imported correctly
  authorizeRoles(['teacher', 'admin']), // Ensure this middleware is defined and imported correctly
  createAttendance
);

module.exports = {staff};
