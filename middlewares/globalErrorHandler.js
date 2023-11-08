const globalErrorHandler = (err, req, res, next) => {
  // STATUS
  // Message
  // Stack
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : 'Failed';
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

// Not Found Error
const notFoundErrorHandler = (req, res, next) => {
  const err = new Error("Can't find " + req.originalUrl + ' on the server ');
  next(err);
};

module.exports = { globalErrorHandler, notFoundErrorHandler };
