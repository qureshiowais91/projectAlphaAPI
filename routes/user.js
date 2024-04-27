const express = require('express');
const user = express.Router()
const { getClassroom } = require("../controllers/classroom");
const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")

// move  all role endpoint here in version 1.2
user.get('/user/classrooms', authenticateToken, authorizeRoles(['parent', 'teacher']), getClassroom);

module.exports = { user };
