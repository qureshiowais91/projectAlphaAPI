const mongoose = require('mongoose');

// Define the schema for the School model
const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        try:String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    //Delete contactDetails after contactInformation work fine
    contactDetails: {
        type: String,
        required: true,
    },
    contactInformation: {
        phone: { type: String },
        email: { type: String },
        website: { type: String },
    },
    inviteCode: {
        type: String,
        required: false,
    },
    ageRange: { type: String },
    establishedDate: { type: Date },
    facilities: { type: [String] },
    studentTeacherRatio: { type: String },
    tuitionFees: {
        type: String,
        validate: {
            validator: function (value) {
                // Regular expression to validate tuition fees format in Rs (e.g., Rs 1000-Rs 2000)
                return /^Rs\s?\d+(\.\d{1,2})?\s?-?\s?Rs\s?\d+(\.\d{1,2})?$/.test(value);
            },
            message: 'Tuition fees must be in the format "Rs min - Rs max" (e.g., Rs 1000 - Rs 2000)."'
        }
    },
    dailySchedule: { type: String },
    extracurricularActivities: { type: String },
    socialMediaLinks: {
        facebook: { type: String, validate: /^https?:\/\/(www\.)?facebook.com\/.+$/ },
        instagram: { type: String, validate: /^https?:\/\/(www\.)?instagram.com\/.+$/ },
    },
    // Array of teachers associated with the school
    teacher: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
        },
    ],
    // Array of parents associated with the school
    parent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parent',
        },
    ],
    // Array of students associated with the school
    student: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    ],
});

// Creating model for School
const School = mongoose.model('School', schoolSchema);

module.exports = School;
