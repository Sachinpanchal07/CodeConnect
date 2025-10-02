const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequst")
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// connection req received 
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
        limit = limit > 50 ? 50 : limit;
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
        res.status(400).json({ message:"Internal Server Error" });
    }
});

// searching

userRouter.post("/user/search", userAuth, async (req, res) => {
  try {
    const { searchedSkill } = req.body;
    const loggedInUser = req.user;

    if (!searchedSkill) {
      return res.status(400).send("No Match Found");
    }

    // Step 1: Get all users with searchedSkill
    const users = await User.find({
      skills: { $regex: searchedSkill, $options: "i" },
      _id: { $ne: loggedInUser._id } // exclude self
    });

    // Step 2: Get all connection requests involving the loggedInUser
    const existingRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    });

    // Step 3: Build a set of userIds already connected/requested
    const excludedUserIds = new Set();
    for (let req of existingRequests) {
      excludedUserIds.add(req.fromUserId.toString());
      excludedUserIds.add(req.toUserId.toString());
    }

    // Step 4: Filter out users who are already in requests
    const filteredUsers = users.filter(
      user => !excludedUserIds.has(user._id.toString())
    );

    return res.json({ data: filteredUsers });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// View Connection 

userRouter.get("/connection/:id", userAuth, async (req, res) =>{
    const { id } = req.params;
    try{
        if(!id) return res.status(400).json({ message: "Bad Request: Pass Id in URL" });    
        const user = await User.findById(id);
        if(!user) return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({ message:"server error" });
    }
});



module.exports = userRouter;