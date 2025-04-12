const mongoose = require("mongoose")

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://sachinpanchal9942:python123@devtinder-cluster.nijhq.mongodb.net/devtinder?retryWrites=true&w=majority&appName=devtinder-cluster')
}

module.exports = {connectDB};

