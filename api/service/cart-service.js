const prisma = require("../models/prisma");

const cartService = {};

cartService.getProductInCart = (id) =>
  prisma.cartitems.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc", // เรียงลำดับตาม timestamp จากมากไปน้อย (ใหม่ไปเก่า)
    },
    include: {
      product: true,
    },
  });

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

cartService.deleteCart = (id) =>
  prisma.cartitems.deleteMany({ where: { userId: id } });

module.exports = cartService;
