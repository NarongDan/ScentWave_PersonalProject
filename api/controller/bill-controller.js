const billService = require("../service/bill-service");
const productService = require("../service/product-service");

const billController = {};

billController.createBill = async (req, res, next) => {
  try {
    //      userId      Int
    //   payDate     DateTime?
    //   payTime     String

    const dataForBill = {
      userId: +req.user.id,
      payDate: new Date(req.body.payDate),
      payTime: req.body.payTime,
      slipImage: req.body.slipImage,
    };

    const bill = await billService.createBill(dataForBill);
    let billDetail = [];
    for (let i = 0; i < req.body.carts.length; i++) {
      const data = {
        billId: bill.id,
        productId: +req.body.carts[i].productId,
        productPrice: +req.body.carts[i].productPrice,
        productCost: +req.body.carts[i].productCost,
        amount: +req.body.carts[i].amount,
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
  }
};

module.exports = billController;
