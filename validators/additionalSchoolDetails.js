const Joi = require('joi');

const facilitySchema = Joi.string().trim().max(255);

const schoolDetailsSchema = Joi.object({
    ageRange: Joi.string().optional().trim().max(255),
    establishedDate: Joi.date().optional(),
    facilities: Joi.array().items(facilitySchema).optional(), // Updated to validate an array of facilities
    tuitionFees: Joi.string().optional().trim().regex(/^Rs\s?\d+(\.\d{1,2})?\s?-?\s?Rs\s?\d+(\.\d{1,2})?$/),
    dailySchedule: Joi.string().optional().trim().max(1000),
});

module.exports = schoolDetailsSchema;
