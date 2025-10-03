const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")
const User = require("../models/user.js");
const {validateEditProfileData} = require("../utils/validation.js");
const {Skills} = require("../utils/skills.js");


// view profile
profileRouter.get("/profile/view", userAuth, async (req, res)=>{
    try{
      const user = req.user;
     if(!user){
        throw new Error("user not found");
      }
      // console.log(user)
      res.send(user); 
    }catch(err){
      res.status(500).send("ERROR "+ err.message);
    }  
});

// edit profile
profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
  try{
    const loggedInUser = req.user;
    const isEditAllowed = validateEditProfileData(req); 
    if(!isEditAllowed){
      throw new Error("edit not allowed !!");
    }
    Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key]);
    
    await loggedInUser.save();
    res.json({
      message:`${loggedInUser.firstName} ,your profile edited successfully`,
      data:loggedInUser
    });

  }catch(err){
    res.status(500).send(err.message);
  }
});

// get Skills 
profileRouter.get("/profile/skills", userAuth, async (req, res) => {
  try{
    // console.log(Skills);
    if(Skills){
      res.json({"data":Skills});
    }
    else{
      res.json({"message":"Data not found"})
    }
  }catch(err){
    res.json({"ERROR: ":"something went wrong"});
  }
})

module.exports = profileRouter;