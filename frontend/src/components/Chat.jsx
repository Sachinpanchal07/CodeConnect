import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // when the page loads then the socket connection is made, the "joinChat" event is emitted.
  // if(!userId) return;
  useEffect(() => {
    const socket = createSocketConnection();
    // emit the joinChat event. (joinChat should be same as backend even).
    socket.emit("joinChat", { userId, targetUserId });

    // write this "messageRecevied" event in usedEffect for better exp.
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
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");

    // here server send meesage to client and client listens that.
    // socket.on("messageReceived", ({firstName, text}) => {
    //   console.log(firstName + ": " + " " + text);
    // })
  };

  return (
    <div className="flex w-full h-full justify-center mt-10">
      <div className="flex flex-col h-[500px] w-[700px] bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <h2 className="font-semibold text-lg">Chat</h2>
          <span className="text-sm text-gray-400">Online</span>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {messages?.map((msg, index) => {
            return (
              <div  key={index}>
                <div className="flex items-start">
                  <div className="chat-header">{msg.firstName}</div>
                  <div className="bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none max-w-[70%] text-sm">
                    {msg.text}
                  </div>
                </div>

                {/* <div className="flex justify-end">
                  <div className="bg-blue-500 px-3 py-2 rounded-lg rounded-br-none max-w-[70%] text-sm">
                    {msg.text}
                  </div>
                </div> */}
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
