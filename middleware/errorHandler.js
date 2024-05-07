// Error handling middleware for handling CustomError instances
const customErrorHandler = (err, req, res, next) => {
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
};

module.exports = customErrorHandler;
