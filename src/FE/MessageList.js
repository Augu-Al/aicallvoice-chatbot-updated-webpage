import React from 'react';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import ChatIcon from '@mui/icons-material/Chat'; // Import the chatbot icon
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ThreePIcon from '@mui/icons-material/ThreeP';

const MessageList = ({ messages }) => {
  return (
    <div className="chatbot-messages">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === 'bot' ? 'bot' : 'user'}`}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {msg.sender === 'user' ? 'U' : <ThreePIcon />} {/* Use ChatIcon for bot messages */}
          </Avatar>
          <div className="message-content">
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            <span className="message-text">{msg.text}</span>

             {/* {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
             */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;