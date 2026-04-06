const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        // console.log(req.cookies, "cookeies");
        // console.log("+++++++++++++++++++++++++++++++++++++")
        // console.log(token, "token");
        if(!token){
            return res.status(401).send("Please login");
        }
        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(process.env.JWT_SECRET);
        // const decodedObj = jwt.verify(token, "mySecretkey");
        // console.log("===================================")
        // console.log("decoded obj", decodedObj);
        // console.log("===================================")

        const user = await User.findById(decodedObj._id);
        if(!user){
            throw new Error("user not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("ERROR " + err.message);
    }
}

module.exports = {userAuth};