const billController = require("../controller/bill-controller");

const billRouter = require("express").Router();

billRouter.post("/", billController.createBill);

module.exports = billRouter;
