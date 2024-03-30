const { Schema, model } = require('mongoose');

// User Schema
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true }
});

const User = model('User', userSchema);

module.exports = { User }; // Named export
