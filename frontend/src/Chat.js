import React, { useRef, useEffect, useState } from 'react';
import { sendMessage } from './api';
import './Chat.css';

function Chat({ messages, setMessages, email }) {
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);  // Start loading

    const response = await sendMessage(input, email);  // ✅ Fixed here
    setMessages([...newMessages, { role: "assistant", content: response }]);
    setIsLoading(false); // Stop loading
  };

  const handleClear = () => {
    if (window.confirm("Clear all chat messages?")) {
      setMessages([]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className="spinner">
            <span>🤖 CyberBot is thinking...!!!!!</span>
          </div>
        )}
        <div ref={chatRef}></div>
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <div className="clear-chat">
        <button onClick={handleClear}>🗑️ Clear Chat</button>
      </div>
    </div>
  );
}

export default Chat;
