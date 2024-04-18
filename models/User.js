const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'teacher', 'parent']
    },
    verified: {
        type: Boolean,
        default: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
