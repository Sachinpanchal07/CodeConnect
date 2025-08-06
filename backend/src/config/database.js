const mongoose = require("mongoose")

const connectDB = async () =>{
    try{
        console.log(process.env.MONGO_URI)
        await mongoose.connect("mongodb+srv://sachinpanchal9942:python123@devtinder-cluster.nijhq.mongodb.net/devtinder?retryWrites=true&w=majority&appName=devtinder-cluster");
    }catch(err){
        console.error("MongoDB connection error", err);
    }
}

module.exports = {connectDB};

