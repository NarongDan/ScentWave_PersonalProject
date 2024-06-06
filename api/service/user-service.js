const prisma = require("../models/prisma");

const userService = {};

userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
    },
  });

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserById = (id) =>
  prisma.user.findUnique({
    where: {
      id,
    },
  });

userService.findUserInfo = (id) => prisma.user.findFirst({ where: { id } });

userService.updateUserInfo = (id, data) =>
  prisma.user.update({
    data,
    where: { id },
  });

module.exports = userService;
