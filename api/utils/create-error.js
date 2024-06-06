const createError = (msg, statusCode, field) => {
  const error = new Error(msg);
  error.statusCode = statusCode;
  error.field = field;
  throw error;
};

module.exports = { createError };
