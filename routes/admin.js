const express = require('express');
const admin = express.Router()

const {createClassroom}  = require("../controllers/classroom")

const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")
const asyncHandler = require("../middleware/asynchandler")

admin.post('/admin/classroom', authenticateToken, authorizeRoles(['admin']), asyncHandler(createClassroom));

module.exports = { admin };
