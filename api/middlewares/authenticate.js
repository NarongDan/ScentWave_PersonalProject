const jwtService = require("../service/jwt-service");
const userService = require("../service/user-service");
const { createError } = require("../utils/create-error");

exports.authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    console.log("This issss", authorization);

    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("unauthenticated", 401);
    }

    const accessToken = authorization.split(" ")[1];

    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);

    if (!user) {
      createError("User was not found", 400);
    }

    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
