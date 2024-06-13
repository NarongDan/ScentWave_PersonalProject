const { createError } = require("../utils/create-error");

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin === false)
      createError("access to the requested resource is forbidden", 403);
    next();
  } catch (error) {
    next(error);
  }
};
