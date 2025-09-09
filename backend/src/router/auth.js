const express = require("express");
const authRouter = express.Router();
const {validateSignupData} = require("../utils/validation.js")
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const getOtp = require("../utils/otp.js");
const sendOTP = require("../utils/nodemailer.js");

// signup the user
authRouter.post("/signup", async (req, res) => {
    try{
      const{firstName, lastName, emailId, password} = req.body;

      const isUserExist = await User.findOne({emailId});
      if(isUserExist) {
        throw new Error("User already exist");
      }
      // OTP
      const otp = getOtp();

      validateSignupData(req); // validate data
      const newPass = await bcrypt.hash(password, 10);
      
      const userInstance = new User({
        firstName,
        lastName,
        emailId,
        password:newPass,
        otp,
        otpExpiry: Date.now() + 5 * 60 * 1000,
      }); // creating user instance
      const savedUser = await userInstance.save();

      // send otp mail
      const info = await sendOTP(emailId, otp);

      const token = await savedUser.getJWT(); // after signup user must login
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({message: "user added successfully", data:savedUser});
    }catch(err){
      res.status(400).send("Error in saving data: " +  err.message)
    }
});

  // login user
authRouter.post("/login", async (req, res) => {
    try{
      const {emailId, password} = req.body;
      const user = await User.findOne({ emailId : emailId });
      if(!user){
        throw new Error("Invalid credentials! email not found");
      }
      const isPasswordValid = await user.validatePassword(password);
      if(!isPasswordValid){
        throw new Error("Invalid credentials! password not matched");
      }
      if(!user.isVerified){
        throw new Error("Please verify your email first !");
      }
      if(user){
        const token = user.getJWT();
        res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)}); // we can also expires cookies
        res.send(user);
      }
      else{
        throw new Error("invalid credentials ");
      }
    }catch(err){
      res.status(400).send("ERROR : " + err.message);
    }
})

// logout
authRouter.post("/logout", async (req, res)=>{
  res.cookie("token", null, {expires:new Date(Date.now())});
  res.send("logout successfully");
})

// verify otp
authRouter.post("/verify/otp", async (req, res)=>{
  try{
    const {emailId, otp} = req.body;
    const user = User.findOne({emailId});
    if(!user){
      throw new Error("User not found");
    }
    if(user.otp != otp){
      throw new Error("Invalid OTP, Please enter correct one!");
    }
    if(user.otpExpiry < Date.now()){
      throw new Error("OTP expired, please generate again");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined
    res.status(200).json({message:"Email verified successfully!"}); 
  }catch(err){
    res.status(500).json({message:"Error in OTP verification"});
  }
});

// resend OTP.

authRouter.post("/resent-otp", async (req, res)=>{
  const{ emailId } = req.body;
  try{
    const otp = getOtp();
    const res = await sendOTP(emailId, otp);
    return res;
  }
  catch(err){
    return err;
  }
})

module.exports = authRouter;