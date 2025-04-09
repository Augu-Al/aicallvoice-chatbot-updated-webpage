import React, { useState } from 'react';
import axios from 'axios';
import '../css/call-log.css';

const MakeCall = () => {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [url, setUrl] = useState('http://localhost:8080/twiml.xml'); // Default TwiML URL
  const [message, setMessage] = useState('');

  const handleMakeCall = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/makeCall', {
        to,
        from,
        url
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error making call:', error);
      setMessage('Failed to make call');
    }
  };

  return (
    <div className='make-call'>
      <h1>Make a Phone Call</h1>
      <input
        type="text"
        placeholder="To (Phone Number)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <span></span>
      <input
        type="text"
        placeholder="From (Twilio Phone Number)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="TwiML URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleMakeCall}>Make Call</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MakeCall;