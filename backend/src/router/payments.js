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
    const user = await User.findOne({_id : payment.userId})
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

// verify payment and mark user premium (for client-side verification - works in dev/test mode)
paymentRouter.post("/premium/verify", userAuth, async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;
    
    if (!paymentId || !orderId) {
      return res.status(400).json({ message: "Payment ID and Order ID required" });
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);

    if (paymentDetails.status === "captured") {
      // Payment successful - update user as premium
      const payment = await Payment.findOne({ orderId });
      
      if (!payment) {
        return res.status(404).json({ message: "Payment record not found" });
      }

      payment.status = "captured";
      await payment.save();

      // Mark user as premium
      const user = await User.findById(req.user._id);
      if (user) {
        user.isPremium = true;
        await user.save();
        return res.status(200).json({ 
          message: "Payment verified successfully! You are now premium.",
          isPremium: true,
          isVerify: true
        });
      }
    }

    res.status(400).json({ message: "Payment not captured", isPremium: false });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ message: err.message });
  }
});

// check if user is premium (GET endpoint)
paymentRouter.get("/premium/check", userAuth, async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "User verification status", 
      isPremium: user.isPremium || false,
    });
    
  } catch (err) {
    console.error("Premium verification error:", err); 
    res.status(500).json({ 
      message: "Internal server error",
    });
  }
});

module.exports = paymentRouter;
