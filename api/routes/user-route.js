const userController = require("../controller/user-controller");
const validator = require("../middlewares/validator");

const userRouter = require("express").Router();

userRouter.post("/myCart", userController.addProductIntoCart);

userRouter.patch("/myCart/:cartItemId", userController.adjustItemNumber);

userRouter.delete("/myCart/:cartItemId", userController.deleteCartItem);

userRouter.get("/info", userController.getUserInfo);

userRouter.patch("/info", validator.updateUser, userController.updateUserInfo);

module.exports = userRouter;
