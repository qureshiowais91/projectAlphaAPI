const express = require('express');
const school = express.Router();
const {
    createSchool,
    getAllSchools,
    updateSchool,
    generateInviteCode
} = require('../controllers/school');


const authenticateToken = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization")
// Create a new school
school.post('/school', authorizeRoles("admin"), authenticateToken, createSchool);

// Retrieve all schools
school.get('/', getAllSchools);

// Update a school
school.put('/', updateSchool);

school.post('/genrateInviteCode',authenticateToken,authorizeRoles(['admin']), generateInviteCode)
// Delete a school
// school.delete('/', deleteSchool);

module.exports = { school };
