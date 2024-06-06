const billController = require("../controller/bill-controller");

const billRouter = require("express").Router();

billRouter.post("/", billController.createBill);

billRouter.get("/", billController.getAllBills);

billRouter.patch("/:billId", billController.ChangeBillStatus);

billRouter.get("/:userId/", billController.getBillById);
billRouter.get("/:userId/:billId", billController.getBillDetailById);

module.exports = billRouter;
