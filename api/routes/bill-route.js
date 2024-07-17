const billController = require("../controller/bill-controller");

const billRouter = require("express").Router();
const uploadToStorage = require("../middlewares/upload-to-storage");
const express = require("express");

billRouter.post(
  "/",
  uploadToStorage.single("slipImage"),
  billController.createBill
);

billRouter.get("/", billController.getAllBills);

billRouter.patch("/:billId", billController.ChangeBillStatus);

billRouter.get("/:userId/", billController.getBillById);
billRouter.get("/:userId/:billId", billController.getBillDetailById);
billRouter.get("/each/detail/:billId", billController.getBillDetailByBillId);

//credit card payment
billRouter.get(
  "/order/creditcard/:id",
  billController.getCreditCardPaymentOrder
);

billRouter.post(
  "/create-checkout-session",
  billController.createCheckoutSession
);

module.exports = billRouter;
