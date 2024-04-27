const express = require('express');
const admin = express.Router()

const {createClassroom}  = require("../controllers/classroom")

const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")

admin.post('/admin/classroom', authenticateToken, authorizeRoles(['admin']), createClassroom);

module.exports = { admin };
