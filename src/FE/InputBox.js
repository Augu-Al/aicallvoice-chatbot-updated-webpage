import React, { useState } from 'react';
import './InputBox.css';

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          className="input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="send-button"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default InputBox;
