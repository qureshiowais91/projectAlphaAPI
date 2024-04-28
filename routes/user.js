const express = require('express');
const user = express.Router()
const { getClassroom, joinClassroom, joinClassroomTeacher, getStudentsOfClassroom } = require("../controllers/classroom");
const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")

// move  all role endpoint here in version 1.2
user.get('/user/classrooms', authenticateToken, authorizeRoles(['parent', 'teacher']), getClassroom);
user.post('/user/classroom/join', authenticateToken, authorizeRoles(['parent']), joinClassroom);
user.post('/user/classroom/students', authenticateToken, authorizeRoles(['teacher']), getStudentsOfClassroom);
user.post('/user/classroomTeacher/join', authenticateToken, authorizeRoles(['teacher']), joinClassroomTeacher);
module.exports = { user };
