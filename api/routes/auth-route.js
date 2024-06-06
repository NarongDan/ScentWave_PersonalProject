const authController = require("../controller/auth-controller");

const validator = require("../middlewares/validator");

const authRouter = require("express").Router();

authRouter.post("/register", validator.register, authController.register);

authRouter.post("/login", validator.login, authController.login);

module.exports = authRouter;
