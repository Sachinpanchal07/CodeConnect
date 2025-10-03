import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    const chats = res.data.chat.messages;

    const chatMessages = chats.map((msg) => {
      return { firstName: msg?.senderId.firstName, text: msg?.text };
    });
    setMessages(chatMessages);
    console.log(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  // when the page loads then the socket connection is made, the "joinChat" event is emitted.
  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetUserId });

    // write this "messageRecevied" event in useEffect.
    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + ": " + " " + text);
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    // when component unmount these this cleanup function will run.
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();

    // send message to server when click send button by emitting the even "sendMessage".
    // TODOs: check if userId and targetUserId are friends

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex w-full h-full justify-center pt-20 pb-5">
      <div className="flex flex-col h-[500px] w-[700px] bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between  border-b border-gray-700">
          <h2 className="font-semibold text-lg">Chat</h2>
          <span className="text-sm text-gray-400">Online</span>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {messages?.map((msg, index) => {
            const isMe = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={"chat " + (isMe ? "chat-end" : "chat-start ")}
              >
                <div className="chat-header text-gray-400">{msg.firstName}</div>
                <div
                  className={
                    "chat-bubble " +
                    (isMe ? "bg-blue-500 text-white" : "bg-gray-300")
                  }
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input area */}
        <div className="bg-gray-800 p-3 border-t border-gray-700 flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 text-sm rounded-full bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleSendMessage}
            // onKeyDown={handleSendMessage}
            className="text-center cursor-pointer bg-green-500 hover:bg-green-600 px-3 py-2 rounded-full transition"
          >
            <i className="bx bxs-send bs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
