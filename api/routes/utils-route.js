const express = require("express");
const bodyParser = require("body-parser");
const billService = require("../service/bill-service");
const stripe = require("stripe")(
  "sk_test_51PRSAsC6Bw2G4bOHJYVCWrrLcGpBOhOFzPwXGQgiAgRQbv3GtA2F99D8y9XAoKSo1ttvumPUbhKFEQV1h40YfbvH00mrSCRSkc"
);
const utilsRouter = express.Router();

const endpointSecret =
  "whsec_94bfd68df74de8cbcbbd291c39bed83382e1197d0b2cba3b47b63fcc1e1a1f7a";

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
};

const createOrder = (session) => {
  // TODO: fill me in
  console.log("Creating order", session);
};

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

utilsRouter.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    const payload = request.body;

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session);
    }
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // Save an order in your database, marked as 'awaiting payment'
        createOrder(session);

        // update status กลับเข้าไปใน database หลังจากลูกค้าจ่ายแล้ว
        const sessionId = session.id;
        const orderStatus = session.status;

        console.log(sessionId, orderStatus);

        const result = await billService.updateCreditCardPaymentStatus(
          sessionId,
          orderStatus
        );
        console.log("This oneeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", result);

        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === "paid") {
          fulfillOrder(session);
        }

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;

        // Fulfill the purchase...
        fulfillOrder(session);

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;

        // // Send an email to the customer asking them to retry their order
        // emailCustomerAboutFailedPayment(session);
        console.log(
          `Payment for session ${session.id} failed or was canceled.`
        );
        break;
      }
    }

    /// อาจจะใช้ nodemailer ในการส่ง emailตรงนี้
    response.status(200).end();
  }
);

/// PromptPay

module.exports = utilsRouter;
