const Joi = require('joi');

const createSchoolSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    address: Joi.string().min(10).max(200).required(),
    contactDetails: Joi.string().required().min(10).max(15)
});

module.exports = createSchoolSchema;
