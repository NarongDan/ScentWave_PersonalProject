const userController = require("../controller/user-controller");
const validator = require("../middlewares/validator");

const userRouter = require("express").Router();

userRouter.get("/myCart", userController.getProductInCart);

userRouter.post("/myCart", userController.addProductIntoCart);

userRouter.patch("/myCart/:cartItemId", userController.adjustItemNumber);

userRouter.delete("/myCart/:cartItemId", userController.deleteCartItem);

userRouter.get("/info", userController.getUserInfo); // ตาม token ที่ล็อคอิน

userRouter.patch("/info", validator.updateUser, userController.updateUserInfo);

userRouter.get("/info/:userId", userController.findUserById); // ตามการค้นหาให้ admin

module.exports = userRouter;
