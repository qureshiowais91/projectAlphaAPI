const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((err) => {
      console.error('Async error caught:', err);
      next(err); // Pass the error to the next error handler middleware
    });
};

module.exports = asyncHandler 