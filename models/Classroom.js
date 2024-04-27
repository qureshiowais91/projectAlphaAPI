const mongoose = require('mongoose');

// Define the schema for the Classroom model
const classroomSchema = new mongoose.Schema({
    classroom: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student model
    }],
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', // Reference to the School model
        required: true
    }
});

// Creating model for Classroom
const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
