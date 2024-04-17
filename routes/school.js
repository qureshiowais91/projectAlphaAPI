const express = require('express');
const school = express.Router();
const {
    createSchool,
    getAllSchools,
    updateSchool,
} = require('../controllers/school');

// Create a new school
school.post('/', createSchool);

// Retrieve all schools
school.get('/', getAllSchools);

// Update a school
school.put('/', updateSchool);

// Delete a school
// school.delete('/', deleteSchool);

module.exports = { school };
