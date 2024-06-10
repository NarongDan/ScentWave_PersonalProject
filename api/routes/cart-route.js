const cartController = require("../controller/cart-controller");

const cartRouter = require("express").Router();

cartRouter.get("/", cartController.getCartById);



module.exports = cartRouter;
