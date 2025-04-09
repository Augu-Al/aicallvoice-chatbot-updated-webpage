import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MessageList from './MessageList.js';
import Banner from './banner.js'; 
import NavBar from './NavBar.js'; 
import CallLog from './CallLog.js'; 
import AppointmentSchedule from './AppointmentSchedule.js';
import ChatbotComponent from '../component/chatbot_component.js'


const Chatbot = () => {
  const [messages, setMessages] = useState([])

  const ChatbotContainer = () => (
    <div className="chatbot-container">
      <div className="chatbot-content">
          <MessageList messages={messages} />
          <ChatbotComponent/>
      </div>  
    </div>
  );

  return (
    <Router>
      <Banner/>
      <div className="app-container">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/call-log" element={<CallLog />} />
            <Route path="/appointment-schedule" element={<AppointmentSchedule />} />
            <Route path="/" element={<ChatbotContainer/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default Chatbot;