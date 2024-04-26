const express = require('express');
const parent = express.Router()
const { addStudent } = require("../controllers/parent");
const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")

parent.post('/student', authenticateToken, authorizeRoles(['parent']), addStudent);

module.exports = { parent };
