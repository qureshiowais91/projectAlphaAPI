const mongoose = require('mongoose');

// Define the schema for the School model
const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    inviteCode: {
        type: String,
        required: false
    },
    // Array of teachers associated with the school
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    // Array of parents associated with the school
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }],
    // Array of students associated with the school
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],

});

// Creating model for School
const School = mongoose.model('School', schoolSchema);

module.exports = School;
