const express = require("express");
const chatRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const Chat = require("../models/chat");

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res)=>{
    const userId = req.user?._id;
    const { targetUserId } = req.params;

    try{
        // fetch message sender detail also using populate.
        let chat = await Chat.findOne({
            participants: { $all: [ userId, targetUserId ] },
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName",
        });

        // If two user started chat first time, hanlde that also
        if(!chat){
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            })
        }
        await chat.save();

        res.status(200).json({chat});

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = chatRouter;