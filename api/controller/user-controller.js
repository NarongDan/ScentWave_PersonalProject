const cartService = require("../service/cart-service");
const hashService = require("../service/hash-service");
const userService = require("../service/user-service");
const { createError } = require("../utils/create-error");

const userController = {};

userController.addProductIntoCartByEmail = async (req, res, naxt) => {};

userController.getProductInCart = async (req, res, next) => {
  try {
    const data = await cartService.getProductInCart(+req.user.id);
    res.status(200).json(data);
  } catch (error) {
    next;
  }
};

userController.addProductIntoCart = async (req, res, next) => {
  try {
    const data = {
      userId: +req.user.id,
      productId: +req.body.productId,
      amount: parseInt(req.body.amount),
      productPrice: parseInt(req.body.productPrice),
    };

    console.log(data);

    const existProduct = await cartService.getProductInCart(data.userId);

    let result;
    //if customer has does have product list at all
    if (!existProduct) result = await cartService.addProductIntoCart(data);

    // if customers has already had product list
    if (existProduct) {
      // Find the specific product by productId
      const productToAdjust = existProduct.find(
        (product) => product.productId === data.productId
      );

      if (productToAdjust) {
        // Adjust the product number if the product is found in the cart
        result = await cartService.adjustProductNumber(
          productToAdjust.id,
          productToAdjust.amount + data.amount
        );
        // if amount is equal to or less than 0, delete it
        if (result.amount <= 0) await cartService.removeCartItem(result.id);
      } else {
        // Add the product to the cart if it doesn't exist
        result = await cartService.addProductIntoCart(data);
      }
    }

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

userController.deleteCart = async (req, res, next) => {
  try {
    await cartService.deleteCart(+req.params.userId);

    res.status(200).json({ message: "cart is empty" });
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
    const data = req.input;

    const existUser = await userService.findUserByEmail(req.user.email);

    if (!existUser) {
      createError("Invalid credentials", 400);
    }

    const isMatch = await hashService.compare(
      data.password,
      existUser.password
    );

    if (!isMatch) {
      createError("invalid credentials", 400, "password");
    }

    delete data.password; // ต้องลบออก ไม่งั้นจะเปลี่ยนดาต้าเบสไปด้วย

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
