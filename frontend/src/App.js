import React, { useState } from 'react';
import Chat from './Chat';
import HistorySidebar from './HistorySidebar';
import { getHistoryByDate } from './api';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleHistorySelect = async (date) => {
    const history = await getHistoryByDate(date);
    setMessages(history); // assumes backend returns [{ role, content }]
  };

  return (
    <div className="app-layout">
      <HistorySidebar onSelectHistory={handleHistorySelect} />
      <div className="main-chat">
        <h1>Cyber Bot 🤖</h1>
        <Chat messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default App;
