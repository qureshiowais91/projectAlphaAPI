const express = require('express');
const staff = express.Router();
const asyncHandler = require('../middleware/asynchandler');

const {
  createAttendance,
  getStaffAttendanceList,
} = require('../controllers/staffAttendace');

const authenticateToken = require('../middleware/authentication');
const authorizeRoles = require('../middleware/authorization');

staff.post(
  '/staff/attendance',
  authenticateToken, // Ensure this middleware is defined and imported correctly
  authorizeRoles(['teacher', 'admin']), // Ensure this middleware is defined and imported correctly
  createAttendance
);

staff.get(
  '/staff/attendances',
  authenticateToken,
  authorizeRoles('admin'),
  asyncHandler(getStaffAttendanceList)
);

module.exports = { staff };
