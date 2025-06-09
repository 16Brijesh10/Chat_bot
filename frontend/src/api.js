//API.js
import axios from 'axios';

const API_URL = "http://localhost:8000";

export const sendMessage = async (message) => {
    const res = await axios.post(`${API_URL}/chat`, { message });
    return res.data.answer;
};

export const getHistoryByDate = async (date) => {
    const res = await axios.post(`${API_URL}/history`, { date });
    return res.data.history;
};
// If you want to list available dates
export const getAvailableDates = async () => {
    const res = await axios.get(`${API_URL}/history/dates`);
    return res.data.dates;
};
