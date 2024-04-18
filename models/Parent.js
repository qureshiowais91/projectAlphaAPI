const mongoose = require('mongoose');

// Define the schema for the Parent model
const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Reference to the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phoneNumber: { type: String }
});

// Creating model for Parent
const Parent = mongoose.model('Parent', parentSchema);

// Exporting models
module.exports =  Parent

