import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "first name is required" }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "last name is required" }),
  //   emailOrMobile: Joi.alternatives([
  //     Joi.string().email({ tlds: false }), // กำหนด email เป็นอะไรก็ได้
  //     Joi.string().pattern(/^[0-9]{10}$/),
  //   ]).messages({
  //     "alternatives.match": "invalid email address or mobile number",
  //   }),

  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "invalid email address" }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({ "string.empty": "invalid phone number" }),

  address: Joi.string()
    .required()
    .messages({ "string.empty": "address is required" }),

  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/) //อย่างต่ำ6ตัว ไม่จำกัดจำนวน
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain only alphabets and numbers",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "confirm password is required",
    "any.only": "password and confirm password do not match",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    console.dir(error);
    return result;
  }
};

export default validateRegister;
