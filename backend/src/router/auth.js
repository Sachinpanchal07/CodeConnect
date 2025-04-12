const express = require("express");
const authRouter = express.Router();
const {validateSignupData} = require("../utils/validation.js")
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

// signup the user
authRouter.post("/signup", async (req, res) => {
    try{
      const{firstName, lastName, emailId, password} = req.body;
      validateSignupData(req); // when user makes the req then this fun will be called 
      const newPass = await bcrypt.hash(password, 10);
      const userInstance = new User({
        firstName,
        lastName,
        emailId,
        password:newPass
      }); // creating user instance
      const savedUser = await userInstance.save();

      const token = await savedUser.getJWT(); // after signup user must login
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({message: "user added successfully", data:savedUser});
    }catch(err){
      res.status(400).send("error in saving data: " +  err.message)
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

module.exports = authRouter;