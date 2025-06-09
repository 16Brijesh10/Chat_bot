import React, { useRef, useEffect, useState } from 'react';
import { sendMessage } from './api';
import './Chat.css';

function Chat({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);

    const reply = await sendMessage(input);
    const botMsg = { role: 'assistant', content: reply };
    setMessages([...updated, botMsg]);
    setInput("");
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
