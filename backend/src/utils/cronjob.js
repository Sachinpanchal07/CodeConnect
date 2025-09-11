// npm i node-cron
// npm i date-fns --> to calculate data 
const cron = require("node-cron");
const {subDays, startOfDay, endOfDay} = require("date-fns");
const ConnectionRequest = require("../models/connectionRequst");
const sendMailToUser = require("./notify");

cron.schedule("* 8 * * *", async () => {
    try{
        const yesterday = subDays(Date.now(), 1);
        const startYesterday = startOfDay(yesterday);
        const endYesterday = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequest.find({
            status : "interested",
            createdAt : {
                $gte : startYesterday,
                $lt : endYesterday
            }
        }).populate("fromUserId toUserId");

        if(pendingRequests){
            const listOfEmails = [
            ... new Set(pendingRequests.map((req) => req.toUserId.emailId)),
            ]   

            console.log(listOfEmails);

            for(const email of listOfEmails){
                try{
                    console.log(email);
                    console.log("Email sent");
                    await sendMailToUser(email);
                }catch(err){
                    console.log("error in for loop")
                    console.log(err);
                }
            }
        }
        else console.log("No pending req found")

    } catch(err){
        console.log("error in cron.schdule function")
        console.log(err);
    }
})