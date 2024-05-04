const { mongoose } = require('mongoose');
// The student will be identified as resource not as A USER.
// Users (admin, parent, teacher) will perform operations on students, who do not have credentials.
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    classRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
});

// Creating model for Student
const Student = mongoose.model('Student', studentSchema);

// Exporting models
module.exports = Student
