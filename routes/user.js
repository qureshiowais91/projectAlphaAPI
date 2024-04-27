const express = require('express');
const user = express.Router()
const { getClassroom,joinClassroom } = require("../controllers/classroom");
const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")

// move  all role endpoint here in version 1.2
user.get('/user/classrooms', authenticateToken, authorizeRoles(['parent', 'teacher']), getClassroom);
user.post('/user/classroom/join', authenticateToken, authorizeRoles(['parent']), joinClassroom);
module.exports = { user };
