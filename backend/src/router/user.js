const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequst")
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// req received
userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]);
        // here we use "fromUserId" reference to fetch the info of "User" Model  using "populate"

        res.json({
            message: "Date fetch successfully",
            connectionRequests,
        });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

// user connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        // user either send the req or accept the req but the status is always accepted.
        // then it would be the connection of the user
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id, status: "accepted"},
                {toUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row)=> {
            // if loggedIn user sent the req then fetch the toUserId(req receiver) data or if 
            // loggedIn user get the req then fetch the sender data
            // kul mila k 2nd person ka data fetch krna h to show the connections of loggedIn user
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data});
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

// user feed
userRouter.get("/feed", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1)*limit; // formula made for skipping.

        // fetch all user except , (himself and he sent or received req to other user) 
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id},
                {fromUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");// select only fromUserId and toUserId from query

        // made the set of hide user from feed
        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId);
            hideUserFromFeed.add(req.toUserId);
        });

        const users = await User.find({
            $and: [
                { _id: { $nin : Array.from(hideUserFromFeed) } },
                { _id: { $ne : loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({ data: users });  

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

// search users by

userRouter.post("/user/search", userAuth, async (req, res) => {
    try{
        const {searchedSkill} = req.body;
        // console.log(req.body);
        if(searchedSkill){
            const users = await User.find({skills:searchedSkill});
            console.log(users);
            return res.json({"data":users});
        }
        res.send("No Match Found");
    }catch(err){
        console.error(err)
    }
});


module.exports = userRouter;