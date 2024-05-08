const express = require('express');
const school = express.Router();
const {
    createSchool,
    getAllSchools,
    updateSchool,
    generateInviteCode,
    joinbyInviteCode,
} = require('../controllers/school');

const authenticateToken = require('../middleware/authentication');
const authorizeRoles = require('../middleware/authorization');

const asyncHandler = require("../middleware/asynchandler")
// Create a new school
school.post(
    '/school',
    authorizeRoles('admin'),
    authenticateToken,
    asyncHandler(createSchool)
);

// Retrieve all schools
school.get('/', getAllSchools);

// Update a school
school.put('/', updateSchool);

school.post(
    '/genrateInviteCode',
    authenticateToken,
    authorizeRoles(['admin']),
    generateInviteCode
);
school.post(
    '/joinbyInviteCode',
    authenticateToken,
    authorizeRoles(['parent', 'teacher']),
    joinbyInviteCode
);
// Delete a school
// school.delete('/', deleteSchool);

module.exports = { school };
