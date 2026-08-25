/**
 * Centralized Error Handling Middleware
 * Intercepts all unhandled or routed errors and sends consistent JSON error structures.
 * Prevents leaking stack traces, database internals, and credentials.
 */

const { AppError } = require('../utils/errors');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'An unexpected error occurred';
  let details = err.details || null;

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    const fieldMessages = Object.values(err.errors).map(e => e.message);
    message = fieldMessages.join(', ');
    details = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId or number cast)
  if (err.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_FORMAT';
    message = `Invalid value for field: ${err.path}`;
  }

  // Handle MongoDB Duplicate Key (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    code = 'CONFLICT';
    const keys = Object.keys(err.keyValue || {});
    message = `Duplicate value for field(s): ${keys.join(', ')}`;
  }

  // Handle JSON parse error from express.json()
  if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    code = 'INVALID_JSON';
    message = 'Malformed JSON body in request';
  }

  // Safety: never leak internals on 500 errors in non-test mode
  if (statusCode === 500 && process.env.NODE_ENV !== 'test') {
    message = 'An unexpected internal server error occurred';
  }

  const responseBody = {
    success: false,
    error: {
      code,
      message
    }
  };

  if (details) {
    responseBody.error.details = details;
  }

  return res.status(statusCode).json(responseBody);
}

module.exports = errorHandler;
