const billService = require("../service/bill-service");
const uploadService = require("../service/upload-service");
const { createError } = require("../utils/create-error");
const fs = require("fs");

const billController = {};

billController.createBill = async (req, res, next) => {
  try {
    if (!req.file) {
      createError("Slip image is required", 400);
    }

    //      userId      Int
    //   payDate     DateTime?
    //   payTime     String
    const dataForBill = {
      userId: +req.user.id,
      payDate: new Date(req.body.payDate),
      payTime: req.body.payTime,
      // slipImage: req.body.slipImage,
    };

    if (req.file) {
      dataForBill.slipImage = await uploadService.upload(req.file.path);
    }

    console.log("This is data of carts", req.body.carts);

    const bill = await billService.createBill(dataForBill);

    console.log(req.body.carts);

    let billDetail = [];
    for (let i = 0; i < req.body.carts.length; i++) {
      const data = {
        billId: +bill.id,
        productId: Number(req.body.carts[i].productId),
        productPrice: Number(req.body.carts[i].productPrice),
        productCost: Number(req.body.carts[i].productCost),
        amount: Number(req.body.carts[i].amount),
      };

      billDetail.push(await billService.createBillDetail(data));
    }

    // carts / array of objects of products
    //         -  productId    Int
    //         -  productPrice Int
    //         -  productCost  Int
    //         -  amount       Int

    res.status(201).json({ message: "bill created", bill, billDetail });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path); // ทำการลบรูปภาพ ไม่ว่่าจะอัพรูปหรือไม่
    }
  }
};

billController.getAllBills = async (req, res, next) => {
  try {
    const data = await billService.getAllBills();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

billController.ChangeBillStatus = async (req, res, next) => {
  try {
    const status = req.body.status;
    const data = await billService.updateBill(+req.params.billId, status);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

billController.getBillById = async (req, res, next) => {
  try {
    const result = await billService.findBillByUserId(+req.params.userId);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

billController.getBillDetailById = async (req, res, next) => {
  try {
    const result = await billService.findBillDetailById(+req.params.userId);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

billController.getBillDetailByBillId = async (req, res, next) => {
  try {
    console.log;
    const result = await billService.findBillDetailByBillId(+req.params.billId);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = billController;
