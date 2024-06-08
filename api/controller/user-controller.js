const cartService = require("../service/cart-service");
const userService = require("../service/user-service");

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

userController.getUserInfo = async (req, res, next) => {
  try {
    const data = req.user;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

userController.updateUserInfo = async (req, res, next) => {
  try {
    const data = {
      firstName: req.input.firstName,
      lastName: req.input.lastName,
      phone: req.input.phone,
      address: req.input.address,
    };

    const result = await userService.updateUserInfo(+req.user.id, data);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

userController.findUserById = async (req, res, next) => {
  try {
    const data = await userService.findUserById(+req.params.userId);
    delete data.password;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
module.exports = userController;
