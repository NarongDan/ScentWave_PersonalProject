const prisma = require("../models/prisma");

const billService = {};

billService.createBill = (data) => prisma.bill.create({ data });

billService.createBillDetail = (data) => prisma.billDetails.create({ data });

module.exports = billService;
