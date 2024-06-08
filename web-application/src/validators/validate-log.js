import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "string.empty": "email address is required" }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "password is required" }),
});

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false }); // validate ทุก keys

  console.dir(error);

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    return result;
  }
};

export default validateLogin;
