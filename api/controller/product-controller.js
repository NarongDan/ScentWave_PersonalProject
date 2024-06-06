const productService = require("../service/product-service");
const { createError } = require("../utils/create-error");

const productController = {};

productController.getAllProducts = async (req, res, next) => {
  try {
    const data = await productService.findAllProducts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

productController.insertProduct = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 5) {
      createError("Please insert all fields of product", 400);
    } // บังคับให้กรอกข้อมูลทุกอย่างเข้ามา

    const data = {
      ...req.body,
      productCost: Number(req.body.productCost),
      productPrice: Number(req.body.productPrice),
    };

    await productService.insertProduct(data);
    res.status(201).json({ message: "product inserted" });
  } catch (error) {
    next(error);
  }
};

productController.updateProduct = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      productCost: Number(req.body.productCost),
      productPrice: Number(req.body.productPrice),
    };

    await productService.updateProduct(+req.params.productId, data);

    res.status(200).json({ message: "product updated" });
  } catch (error) {
    next(error);
  }
};

productController.deleteProduct = async (req, res, next) => {
  try {
    // await productService.deleteProduct(+req.params.productId);
    await productService.removeProduct(+req.params.productId);
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = productController;
