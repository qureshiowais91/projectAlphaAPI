const { mongoose } = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

// Creating model for Student
const Student = mongoose.model('Student', studentSchema);

// Exporting models
module.exports = {
    Student,
};