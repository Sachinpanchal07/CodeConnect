const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");
const User = require("../models/user");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

// create order API
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        firstName: firstName,
        lastName: lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    // create order payment instance and save in db
    const payment = new Payment({
      userId: req.user?._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
    // console.log(order);
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// webhook API for razorpay to call for verification. ( # Will Run when app is deployed )
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.header("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      res.status(400).json({ message: "Webhook signature is invalid!" });
    }

    // update payment status in db.
    const paymentDetials = req.body.payload.payment.entity;
    const payment = await Payment.findOne({orderId : paymentDetials.order_id});
    payment.status = paymentDetials.status;
    await payment.save();

    // mark user premium.
    const user = User.findOne({_id : payment.userId})
    user.isPremium = true;
    await user.save();

    // if payment sucess
    // if(req.body.event == "payment.captured"){
    // }

    // if payment fail
    // if(req.body.event = "payment.failed"){
    // }

    // send res to razorpay --> must with status(200).
    res.status(200).json({message: "Webhook received successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// verify payment
paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isVerify = user.isPremium || false; 
    
    res.status(200).json({ 
      message: "User verification status", 
      isVerify,
    });
    
  } catch (err) {
    console.error("Premium verification error:", err); 
    res.status(500).json({ 
      message: "Internal server error",
    });
  }
});

module.exports = paymentRouter;
