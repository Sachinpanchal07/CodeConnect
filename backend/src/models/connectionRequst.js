const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User // reference to the user collection
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User 
    },
    status:{
        type:String,
        required:true,
        enum:{  // enum ensure only these value are allowed
            values:["ignored", "interested", "accepted", "rejected"], 
            message:`{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps:true
}
);

connectionRequestSchema.pre("save", function (next){
    const connectionRequest  = this; // referes to current document to be saved
    // check if fromUserId is same as toUserId.
    if(connectionRequest.fromUserId.equals(this.toUserId)){
        throw new Error("Cannot send connectiono request to yourself!");
    }
    next();
})

// creating compound index
connectionRequestSchema.index({ firstName: 1, lastName: 1 })

const ConnectionRequestModel =  mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;