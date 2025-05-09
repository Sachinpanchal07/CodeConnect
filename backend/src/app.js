const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
// import the routers and use them
const authRouter = require("./router/auth.js")
const requestRouter = require("./router/request.js")
const profileRouter = require("./router/profile.js");
const userRouter = require("./router/user.js");
const cors = require("cors");

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
  })
);
app.use(express.json());
app.use(cookieParser());

// use router
app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)



connectDB().then(()=>{
  console.log("database connected successfully");
  // when db is connected then the app.listen starting accepting the request.
  // best way to connect to db.
  app.listen(3000, () => { 
    console.log("server is listening at port 3000");
  });
})
.catch((err)=>{
  console.error("database cannot be connected");
});



