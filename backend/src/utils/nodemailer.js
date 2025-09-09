const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"codeconnect.application@gmail.com",
        pass:"uklk axnu asqi uejc"
    },
});

const sendOTP  = async (email, otp) => {
    const mailOptions = {
        from: "codeconnect.application@gmail.com",
        to:email,
        subject:"OTP for CodeConnect signup",
        text:`Dear User your OTP for signup is ${otp}, It is valid for 5 minutes only.`
              
    }
    try{
        let info = await transporter.sendMail(mailOptions);
        console.log("otp sent", info.response)
        return info;
    }catch(err){
        console.log("error in sending otp", err);
        return err;
    }
    
};


module.exports = sendOTP;    