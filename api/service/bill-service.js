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
  });
module.exports = billService;

billService.findBillDetailById = (id) =>
  prisma.billDetails.findMany({
    where: { id },
  });
