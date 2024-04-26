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
        type: String,//1 2 3 4 6A 7B so String
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
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
