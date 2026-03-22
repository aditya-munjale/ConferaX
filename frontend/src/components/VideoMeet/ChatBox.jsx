import React, { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";

export default function ChatBox({
  messages,
  username,
  sendMessage,
  closeChat,
}) {
  const [messageInput, setMessageInput] = useState("");

  const handleSend = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-gray-900/95 backdrop-blur-2xl border-l border-gray-800 z-50 flex flex-col shadow-2xl animate-fade-in-right">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-black text-white flex items-center">
          <ChatIcon className="mr-2 text-purple-400" />
          Room Chat
        </h2>
        <button
          onClick={closeChat}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-400 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length !== 0 ? (
          messages.map((item, index) => {
            const isMe = item.sender === username;
            return (
              <div
                key={index}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <span className="text-xs font-bold text-gray-500 mb-1 ml-1">
                  {isMe ? "You" : item.sender}
                </span>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                    isMe
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700"
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {item.data}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-70">
            <ChatIcon className="text-4xl mb-4" />
            <p className="font-medium text-center px-8">
              No messages yet. Say hello to the room!
            </p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-800 bg-gray-900">
        <div className="flex bg-gray-800 rounded-2xl p-1 border border-gray-700">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white focus:outline-none placeholder-gray-500 font-medium"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!messageInput.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white px-6 rounded-xl font-bold transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
