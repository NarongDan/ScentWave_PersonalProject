const { createError } = require("../utils/create-error");
const {
  registerSchema,
  loginSchema,
  infoSchema,
} = require("../validator/auth-validator");

const validator = {};

validator.register = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    createError(error.details[0].message, 400);
  }
  req.input = value;
  next();
};

validator.login = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);

  if (error) {
    createError(error.details[0].message, 400);
  }
  req.input = value;
  next();
};

// validator.updateInfo = (req, res, next) = {
//   const {value, error} =
// }

validator.updateUser = (req, res, next) => {
  const { value, error } = infoSchema.validate(req.body);
  if (error) {
    createError(error.details[0].message, 400);
  }
  req.input = value;
  next();
};

module.exports = validator;
