const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"codeConnect"
        });
    }catch(err){
        console.error("MongoDB connection error", err);
        throw err; 
    }
}

module.exports = {connectDB};

