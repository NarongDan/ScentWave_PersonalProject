const prisma = require("../models/prisma");

const productService = {};

productService.findAllProducts = () =>
  prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      status: "use",
    },
  });

productService.insertProduct = (data) =>
  prisma.product.create({
    data,
  });

productService.updateProduct = (id, data) =>
  prisma.product.update({
    data,
    where: { id },
  });

// productService.deleteProduct = (id) => prisma.product.delete({ where: { id } }); ใช้ในกรณีที่ลบจริงๆ

productService.removeProduct = (id) =>
  prisma.product.update({
    data: {
      status: "un-use",
    },
    where: { id },
  });

productService.findProductById = (id) =>
  prisma.product.findFirst({
    where: {
      id,
    },
  });

module.exports = productService;
