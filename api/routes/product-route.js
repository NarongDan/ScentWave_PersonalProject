const productController = require("../controller/product-controller");
const { authenticate } = require("../middlewares/authenticate");

const uploadToStorage = require("../middlewares/upload-to-storage");

const productRouter = require("express").Router();

productRouter.get("/", productController.getAllProducts);

productRouter.post(
  "/",
  authenticate,
  uploadToStorage.single("productImage"),
  productController.insertProduct
);

productRouter.patch(
  "/:productId",
  authenticate,
  uploadToStorage.single("productImage"),
  productController.updateProduct
);

productRouter.delete(
  "/:productId",
  authenticate,
  productController.deleteProduct
);

module.exports = productRouter;
