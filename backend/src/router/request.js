const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user.js");
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequst.js");
const { default: mongoose } = require("mongoose");

// send connection req
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res)=>{
    try{
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id;
        const status = req.params.status;
    
        // API level validations
        const allowedStatus = ["interested", "ignored"];
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message:"User not found"});
        }
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }
        // check if that req already exist in db
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).json({message:"User already exist"})
        }

        // save in db
        const data = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await data.save();
        return res.json({
            message:req.user.firstName + " " + status + " " + toUser.firstName,
            data
        })
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

// accept or reject connection req
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res)=>{
    try{
        const { status, requestId } = req.params;
        const loggedInUser = req.user;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("status is invalid");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });
        // console.log(loggedInUser._id+ " " + requestId+ " " + status );
        if(!connectionRequest){
            return res.status(404).json({
                message: "Connection request not found"
            });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({
            message:`request ${connectionRequest.status} successfully`,
            data
        })
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

//  remove connection. 

requestRouter.delete("/request/remove/:id", userAuth, async (req, res) => {
    try{
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.send("Invalid request Id")
        }
        const request = await ConnectionRequest.findById(id);
        if(!request){
            return res.send("invalid request");
        }
        await ConnectionRequest.findByIdAndDelete(id);
        res.send("Connection Removed Successfully");
    }catch(err){
        res.status(400).json({message : err.message});
    }
});

// fetch all the connection requests
requestRouter.get("/request/all", userAuth, async (req, res)=> {
    const data = await ConnectionRequest.find();
    res.json({data});
})

module.exports = requestRouter;