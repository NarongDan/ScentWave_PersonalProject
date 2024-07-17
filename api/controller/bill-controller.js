const billService = require("../service/bill-service");
const uploadService = require("../service/upload-service");
const { createError } = require("../utils/create-error");
const fs = require("fs");
const stripe = require("stripe")(
  "sk_test_51PRSAsC6Bw2G4bOHJYVCWrrLcGpBOhOFzPwXGQgiAgRQbv3GtA2F99D8y9XAoKSo1ttvumPUbhKFEQV1h40YfbvH00mrSCRSkc"
);
const { v4: uuidv4 } = require("uuid");

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

// credit card payment
billController.createCheckoutSession = async (req, res, next) => {
  try {
    console.log(req.input);
    // make session paymnet ขอจ่ายเงิน

    const items = [
      { name: "T-shirt", price: 2000, quantity: 1 },
      { name: "Jeans", price: 5000, quantity: 1 },
      { name: "Cap", price: 1500, quantity: 2 },
    ];

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const orderId = uuidv4();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "promptpay"],
      customer_email: req.user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:8888/success.html?id=${orderId}`,
      cancel_url: `http://localhost:8888/cancel.html`,
    });

    console.log(session);

    const orderData = {
      userId: +req.user.id,
      orderId: orderId,
      orderStatus: session.status,
      sessionId: session.id,
      type: "credit card",
    };

    const result = await billService.saveOrderDataForCreditCardPayment(
      orderData
    );

    res.status(200).json({ order: result });
  } catch (error) {
    next(error);
  }
};

billController.getCreditCardPaymentOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const result = await billService.getCreditCardPaymentOrder(orderId);
    const orderResult = result[0];

    res.status(200).json({ orderResult });
  } catch (error) {
    next(error);
  }
};

module.exports = billController;
