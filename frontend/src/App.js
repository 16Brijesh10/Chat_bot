import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import HistorySidebar from './HistorySidebar';
import { getHistoryByDate } from './api';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import './App.css';
import './firebase'; // Make sure Firebase is initialized in this file

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Sign-in error", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setMessages([]);
  };

  const handleHistorySelect = async (date) => {
    const history = await getHistoryByDate(date);
    setMessages(history);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="app-layout">
      {user ? (
        <>
          <HistorySidebar onSelectHistory={handleHistorySelect} />
          <div className="main-chat">
            <div className="header">
              <h1>Cyber Bot 🤖</h1>
              <button className="sign-in-btn" onClick={handleSignOut}>
                ⬅️ Sign Out ({user.displayName})
              </button>
            </div>
            <Chat messages={messages} setMessages={setMessages} />
          </div>
        </>
      ) : (
        <div className="login-page">
          <div className="login-container">
            <div className="login-box">
              <h1>Welcome to Cyber Bot 🤖</h1>
              <button className="sign-in-btn" onClick={handleGoogleSignIn}>
                Sign in with Google
              </button>
            </div>
          </div>
        </div> 
      )}
    </div>
  );
}

export default App;
