const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber:{
    type: String,
    unique: false, 
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'teacher', 'parent'],
  },
  verified: {
    type: Boolean,
    default: true,
  },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
