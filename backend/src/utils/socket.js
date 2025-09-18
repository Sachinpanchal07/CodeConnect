const socket = require("socket.io");
// import User from "../models/user";

const initializeSocket = (server)=> {
    const io = socket(server, { cors: { origin: "http://localhost:5173" } } );
    // these all are the events--> connection, joinChat, sendMessage, disconnect
    io.on("connection", (socket) => {

        // when client emit event "joinChat" then client also send some data {userId, targetUserId}.
        socket.on("joinChat", ({userId, targetUserId}) => {
            const roomId = [userId, targetUserId].sort().join("_");
            // console.log("joining room: " + roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage",async ({firstName, userId, targetUserId, text}) => {
            // client send data/message to server then server will send/broadcast this message to room.
            const roomId = [userId, targetUserId].sort().join("_");
            console.log(firstName + ": " + " " + text);
           
            

            io.to(roomId).emit("messageReceived", {firstName, text});
        });

        socket.on("disconnect", () => {});
    });
};

module.exports = initializeSocket;