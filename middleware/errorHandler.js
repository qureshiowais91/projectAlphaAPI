const CustomError = require('../util/error');

// Error handling middleware for handling CustomError instances
const customErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
  } else {
    res.status(500).json({ error: "Error Not Handled" }); // Pass the error to the next error handling middleware
  }
};

module.exports = customErrorHandler;
