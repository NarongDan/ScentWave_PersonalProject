const prisma = require("../models/prisma");

const cartService = {};

cartService.addProductIntoCart = (data) =>
  prisma.cartitems.create({
    data,
  });

cartService.adjustProductNumber = (id, number) =>
  prisma.cartitems.update({
    data: {
      amount: number,
    },
    where: { id },
  });

cartService.removeCartItem = (id) => prisma.cartitems.delete({ where: { id } });

module.exports = cartService;
