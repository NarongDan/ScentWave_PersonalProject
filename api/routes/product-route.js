const productController = require("../controller/product-controller");
const { authenticate } = require("../middlewares/authenticate");
const { isAdmin } = require("../middlewares/is-admin");

const uploadToStorage = require("../middlewares/upload-to-storage");

const productRouter = require("express").Router();

productRouter.get("/", productController.getAllProducts);

productRouter.post(
  "/",
  authenticate,
  isAdmin,
  uploadToStorage.single("productImage"),
  productController.insertProduct
);

productRouter.patch(
  "/:productId",
  authenticate,
  isAdmin,
  uploadToStorage.single("productImage"),
  productController.updateProduct
);

productRouter.delete(
  "/:productId",
  authenticate,
  isAdmin,
  productController.deleteProduct
);

module.exports = productRouter;
