import React from "react";

const Chat = () => {
  return (
    <div className="flex w-full h-full justify-center mt-10">
      <div className="flex flex-col h-[500px] w-[700px] bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <h2 className="font-semibold text-lg">Chat</h2>
          <span className="text-sm text-gray-400">Online</span>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {/* Received message */}
          <div className="flex items-start">
            <div className="bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none max-w-[70%] text-sm">
              Hey! How are you?
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 px-3 py-2 rounded-lg rounded-br-none max-w-[70%] text-sm">
              I’m good! Working on CodeConnect 🚀
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="bg-gray-800 p-3 border-t border-gray-700 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 text-sm rounded-full bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button className="cursor-pointer bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-medium transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
