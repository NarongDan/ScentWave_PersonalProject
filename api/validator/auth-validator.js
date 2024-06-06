const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  //   emailOrMobile: Joi.alternatives([
  //     Joi.string().email({ tlds: false }),
  //     Joi.string().pattern(/^[0-9]{10}$/),
  //   ])
  //     .required()
  //     .strip(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  address: Joi.string().required(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  //   email: Joi.string().default(Joi.ref("emailOrMobile")).forbidden(),
  //   mobile: Joi.string().default(Joi.ref("emailOrMobile")).forbidden(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
