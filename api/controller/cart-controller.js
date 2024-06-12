const cartService = require("../service/cart-service");
const userService = require("../service/user-service");

const cartController = {};

cartController.addProductIntoCart = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);

    for (let item of req.body.cart) {
      await cartService.addProductIntoCart({
        userId: +user.id,
        productId: +item.productId,
        amount: +item.amount,
        productPrice: +item.productPrice,
      });
    }

    res.status(200).json({ message: "Products added to cart successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = cartController;
