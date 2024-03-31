const mongoose = require('mongoose');

// Define the schema for the Organization model
const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Array of users with role 'teacher' in the organization
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    // Array of users with role 'parent' in the organization
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }],
    // Array of users with role 'student' in the organization
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    // Array of users with role 'admin' in the organization
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    // Add more fields as needed
});

// Creating model for Organization
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
