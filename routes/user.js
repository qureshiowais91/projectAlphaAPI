const express = require('express');
const user = express.Router();
const {
  getClassroom,
  joinClassroom,
  joinClassroomTeacher,
  getStudentsOfClassroom,
} = require('../controllers/classroom');
const { getStudents } = require('../controllers/student');

const { createAttendance } = require('../controllers/attendance');
const authenticateToken = require('../middleware/authentication');
const authorizeRoles = require('../middleware/authorization');
const asyncHandler = require('../middleware/asynchandler');
const getPaginatedResults = require('../middleware/paginationFilter');

// models
const Student = require('../models/Student');

// move  all role endpoint here in version 1.2
user.get(
  '/user/classrooms',
  authenticateToken,
  authorizeRoles(['parent', 'teacher']),
  getClassroom
);
user.post(
  '/user/classroom/join',
  authenticateToken,
  authorizeRoles(['parent']),
  joinClassroom
);
user.get(
  '/user/students',
  authenticateToken,
  authorizeRoles(['parent', 'admin', 'teacher']),
  getPaginatedResults(Student),
  asyncHandler(getStudents)
);
user.post(
  '/user/classroom/students',
  authenticateToken,
  authorizeRoles(['teacher']),
  getStudentsOfClassroom
);
user.post(
  '/user/classroomTeacher/join',
  authenticateToken,
  authorizeRoles(['teacher']),
  joinClassroomTeacher
);
user.post(
  '/user/attendance',
  authenticateToken,
  authorizeRoles(['teacher']),
  createAttendance
);
module.exports = { user };
