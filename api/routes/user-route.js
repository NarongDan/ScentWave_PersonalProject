const userController = require("../controller/user-controller");

const userRouter = require("express").Router();

userRouter.post("/myCart", userController.addProductIntoCart);

userRouter.patch("/myCart/:cartItemId", userController.adjustItemNumber);

userRouter.delete("/myCart/:cartItemId", userController.deleteCartItem);

module.exports = userRouter;
