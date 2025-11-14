// console.log(process.env)
require('dotenv').config()
const express = require("express");
const {connectDB} = require("./src/config/database");
const app = express();
const cookieParser = require("cookie-parser");
const http = require("http");
const initializeSocket = require("./src/utils/socket.js");

// for web socket
const server = http.createServer(app);
initializeSocket(server);

// import the routers and use them
const authRouter = require("./src/router/auth.js");
const requestRouter = require("./src/router/request.js");
const profileRouter = require("./src/router/profile.js");
const userRouter = require("./src/router/user.js");
const paymentRouter = require("./src/router/payments.js");
const chatRouter = require("./src/router/chat.js");
const cors = require("cors");
require("./src/utils/cronjob");

app.use(cors({
  origin:"http://localhost:5173" || "https://code-connect-zeta-lilac.vercel.app/",
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
app.use("/", paymentRouter)
app.use("/", chatRouter)

const port = process.env.PORT || 3000;

connectDB().then(()=>{
  console.log("database connected successfully");
  // when db is connected then the app.listen starting accepting the request.
  // best way to connect to db.
  server.listen(port, () => { 
    console.log("server is listening at port 3000");
  });
})
.catch((err)=>{
  console.error("database cannot be connected");
});



