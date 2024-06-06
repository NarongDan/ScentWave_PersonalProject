const cartService = require("../service/cart-service");

const userController = {};

userController.addProductIntoCart = async (req, res, next) => {
  try {
    const data = {
      userId: +req.user.id,
      productId: +req.body.productId,
      amount: 1,
      productPrice: +req.body.productPrice,
    };

    const result = await cartService.addProductIntoCart(data);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};

userController.adjustItemNumber = async (req, res, next) => {
  try {
    const result = await cartService.adjustProductNumber(
      +req.params.cartItemId,
      +req.body.amount
    );

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};

userController.deleteCartItem = async (req, res, next) => {
  try {
    await cartService.removeCartItem(+req.params.cartItemId);
    res.status(200).json({ message: "This cart has been removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
