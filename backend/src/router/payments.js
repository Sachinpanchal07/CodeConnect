const express = require("express")
const paymentRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");


paymentRouter.post("/payment/create",  async (req, res) => {
    try{
        const order = await razorpayInstance.orders.create({
            amount: 70000,
            currency: "INR",
            receipt: "receipt_"+Date.now(),
            notes:{
                firstName: "value1",
                lastName: "value2",
                membershipType: "silver",
            }
        });

        // console.log(order);
        res.json({ order })
    }catch(err){
        res.status(500).json({message: err.message});
    }
})



module.exports = paymentRouter;