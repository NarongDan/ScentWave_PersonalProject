const cartController = require("../controller/cart-controller");

const cartRouter = require("express").Router();

cartRouter.post("/cartFromGuest", cartController.addProductIntoCart);

module.exports = cartRouter;
