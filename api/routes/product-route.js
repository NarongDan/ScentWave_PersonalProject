const productController = require("../controller/product-controller");
const { authenticate } = require("../middlewares/authenticate");

const productRouter = require("express").Router();

productRouter.get("/", productController.getAllProducts);

productRouter.post("/", authenticate, productController.insertProduct);

productRouter.patch(
  "/:productId",
  authenticate,
  productController.updateProduct
);

productRouter.delete(
  "/:productId",
  authenticate,
  productController.deleteProduct
);

module.exports = productRouter;
