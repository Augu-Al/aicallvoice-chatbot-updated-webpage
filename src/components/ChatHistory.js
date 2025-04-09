import React from 'react';

const ChatHistory = ({ messages }) => {
  return (
    <div className="chat-history-wrapper">
      <div className="chat-history">
        {messages && messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="empty-chat">
            Start a conversation...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory; 