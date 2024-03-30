const jwt = require("jsonwebtoken");

/**
 * Generate JWT token with the provided payload and secret key from environment variables
 * @param {object} payload - Payload data to be included in the token
 * @param {string} expiresIn - Expiration time for the token (e.g., '1h' for 1 hour)
 * @returns {string} JWT token
 */
const generateToken = (payload, expiresIn) => {
    console.log(payload)
    const secretKey = process.env.JWT_SECRET; // Access secret key from environment variable
    return jwt.sign(payload, secretKey, expiresIn);
};

module.exports =  generateToken ;
