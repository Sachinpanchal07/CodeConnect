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

    // send message to server when click send button by emitting the event "sendMessage".
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
    <div className="flex w-full h-screen sm:px-4 justify-center pt-24 pb-8 bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-950 to-gray-950">
      <div className="flex flex-col h-full max-h-[700px] w-full max-w-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 sm:rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-gray-900/80 px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <div>
              <h2 className="font-black text-white tracking-tight">Direct Message</h2>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">End-to-End Encrypted</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <i className='bx bx-dots-vertical-rounded text-xl'></i>
          </button>
        </div>

        {/* Message Area */}
        <div
          className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide"
          style={{
            backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.95)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTGngzEmvbo46fJUXFkf4LGQ1AMgMwt9fmQ&s')",
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        >
          {messages?.map((msg, index) => {
            const isMe = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[80%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] font-bold text-gray-500 mb-1 px-1 uppercase tracking-tighter">
                    {msg.firstName}
                  </span>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                      isMe 
                        ? "bg-blue-600 text-white rounded-tr-none shadow-blue-500/10" 
                        : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="bg-gray-900/80 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-2xl border border-gray-700 focus-within:border-blue-500/50 transition-all">
            <button className="text-gray-500 hover:text-gray-300 ml-2">
              <i className='bx bx-plus-circle text-xl'></i>
            </button>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              type="text"
              placeholder="Write a message..."
              className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-gray-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-blue-600/20"
            >
              <i className="bx bxs-send text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
