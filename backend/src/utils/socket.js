const socket = require("socket.io");
const Chat = require("../models/chat");
// import User from "../models/user";

const initializeSocket = (server) => {
  const io = socket(server, { cors: { origin: "http://localhost:5173" } });
  // these all are the events--> connection, joinChat, sendMessage, disconnect
  io.on("connection", (socket) => {
    // when client emit event "joinChat" then client also send some data {userId, targetUserId}.
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      // console.log("joining room: " + roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          // client send data/message to server then server will send/broadcast this message to room.
          const roomId = [userId, targetUserId].sort().join("_");
          console.log(firstName + ": " + " " + text);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          // if new chat is started b/w two users.
          if (!chat) {
            // make new chat and save messaeg in db.
              chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, text });
          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName, text });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
