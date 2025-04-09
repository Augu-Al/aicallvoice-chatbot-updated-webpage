import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CHAT_SAVE, API_URL, MODEL_NAME } from '../common/constants'; 
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export default function ChatbotComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(''); // New state variable for session ID

  useEffect(() => {
    // Generate a new session ID when the component mounts
    setSessionId(uuidv4());
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    console.log('Generating response...');
    const newMessages = [...messages, { sender: 'user', text: input, timestamp: Date.now() }];
    setMessages(newMessages);

    // Check if the user says "bye" to end the session
    if (input.trim().toLowerCase() === 'bye') {
      console.log('Ending the session...', sessionId);
      console.log('newMessages:', newMessages);
      setSessionId(''); // Clear the session ID
      setInput(''); // Clear the input field

      // Save chat history to MongoDB
      try {
        console.log('Saving chat history...');  
        await axios.post(API_CHAT_SAVE, {
          sessionId: sessionId,
          messages: newMessages
        });
        console.log('Chat history saved successfully');
      } catch (error) {
        console.error('Error saving chat history:', error);
      }

      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        model: MODEL_NAME,
        prompt: input,
        sessionId: sessionId, // Include the session ID in the request
        stream: false,
      });
      console.log("Response : ", response.data.response);
      const botMessage = { sender: 'bot', text: response.data.response, timestamp: Date.now() };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setOutput(response.data.response);
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while generating the response.');
    }
    setLoading(false);
    setInput(''); // Clear the input field after generating the response
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt..."
        style={{ width: '100%', height: 200 }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <div>
        <h3>Chat history:</h3>
        {messages.map((message, index) => (
          <p key={index}>
            {message.sender === 'user' ? (
              <>
                <i className="fas fa-user"></i> {/* Font Awesome User Icon */}
                <strong> User:</strong> {message.text}
              </>
            ) : (
              <>
                <i className="fas fa-robot"></i> {/* Font Awesome Robot Icon */}
                <strong> Bot:</strong> {message.text}
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}