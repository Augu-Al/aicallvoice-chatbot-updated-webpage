import React from 'react';
import Navbar from './components/Navbar';
import ChatHistory from './components/ChatHistory';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="banner-header">
          {/* Banner content */}
        </div>
        <ChatHistory messages={messages} />
        <div className="input-wrapper">
          {/* Input content */}
        </div>
        <div className="chatbot-container">
          {/* Chatbot content */}
        </div>
      </div>
    </>
  );
}

export default App; 