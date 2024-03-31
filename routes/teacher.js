const express = require('express');
const teacher = express.Router();
const { addTeacher, getListTeacher } = require('../controllers/teacher');

// Register route
teacher.post('/teacher', addTeacher);

// Login route
teacher.get('/teachers', getListTeacher);

module.exports = { teacher };
