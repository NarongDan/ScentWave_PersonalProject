const hashService = require("../service/hash-service");
const userService = require("../service/user-service");
const { createError } = require("../utils/create-error");
const jwtService = require("../service/jwt-service");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;

    const existUser = await userService.findUserByEmail(data.email);

    if (existUser) {
      createError("email already registered", 400, "email");
    }

    data.password = await hashService.hash(data.password);

    await userService.createUser(data);
    res.status(201).json({ message: data });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const data = req.input;

    const existUser = await userService.findUserByEmail(data.email);
    if (!existUser) {
      createError("Invalid credentials", 400);
    }

    const isMatch = await hashService.compare(
      data.password,
      existUser.password
    );

    if (!isMatch) {
      createError("invalid credentials", 400);
    }

    const accessToken = jwtService.sign({ id: existUser.id });

    res.status(200).json({ isAdmin: existUser.isAdmin, accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
