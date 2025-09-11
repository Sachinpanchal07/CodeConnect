const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service : "gmail", 
    auth : {
        user : "codeconnect.application@gmail.com",
        pass : "uklk axnu asqi uejc"
    }
});


const sendMailToUser = async (email) => {
    const mailOptions = {
        from : "codeconnect.application@gmail.com",
        to : email,
        subject : "CodeConnect connection requests",
        text : "Dear User You have received a new connection request. Please log in to your account to accept or reject the request at your convenience."
    }

    try{
        const info = await transporter.sendMail(mailOptions);
        return info
    } catch(err){
        console.log("error in sendMailToUser function")
        console.log(err);
    }
}

module.exports = sendMailToUser;