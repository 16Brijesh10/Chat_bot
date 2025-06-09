import React, { useEffect, useState } from 'react';
import { getHistoryByDate } from './api';
import './HistorySidebar.css';

function HistorySidebar({ onSelectHistory }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // For demo: generate last 5 days
    const today = new Date();
    const lastFive = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d.toISOString().split('T')[0];
    });
    setDates(lastFive);
  }, []);

  return (
    <div className="history-sidebar">
      <h2>Chat History</h2>
      <ul>
        {dates.map((date) => (
          <li key={date} onClick={() => onSelectHistory(date)}>
            {date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorySidebar;