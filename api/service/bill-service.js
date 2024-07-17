const prisma = require("../models/prisma");

const billService = {};

billService.createBill = (data) => prisma.bill.create({ data });

billService.createBillDetail = (data) => prisma.billDetails.create({ data });

billService.getAllBills = () =>
  prisma.bill.findMany({
    orderBy: {
      id: "desc",
    },
  });

billService.updateBill = (id, status) =>
  prisma.bill.update({
    where: { id },
    data: {
      status: status,
    },
  });

billService.findBillByUserId = (id) =>
  prisma.bill.findMany({
    where: { userId: id },
    include: { BillDetails: true },
    orderBy: { id: "desc" },
  });

billService.findBillDetailById = (id) =>
  prisma.billDetails.findMany({
    where: { id },
  });

billService.findBillDetailByBillId = (id) =>
  prisma.billDetails.findMany({
    where: {
      billId: id,
    },
    include: {
      product: {
        select: {
          productName: true,
        },
      },
    },
  });

billService.saveOrderDataForCreditCardPayment = (data) =>
  prisma.bill.create({ data });

billService.getCreditCardPaymentOrder = (orderId) =>
  prisma.bill.findMany({
    where: {
      orderId: orderId,
    },
  });

billService.updateCreditCardPaymentStatus = (sessionId, orderStatus) =>
  prisma.bill.update({
    where: { sessionId: sessionId },
    data: { orderStatus: orderStatus },
  });
module.exports = billService;
