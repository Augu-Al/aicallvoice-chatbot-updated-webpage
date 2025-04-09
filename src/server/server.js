const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const port = 4000; // Change the port number here
const { dbUsername, dbPassword, dbHost, dbPort, dbName,twilioAccountSid,twilioAuthToken }= require('../common/constants');
const twilio = require('twilio');
const Chat = require('../model/chatHistory');
const appointment = require('../model/appointmentSchedule');
const Customer = require('../model/customers');
const Staff = require('../model/staffInfo');  
const client = twilio(twilioAccountSid, twilioAuthToken);

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.post('/api/generate', async (req, res) => {
  const { message, sessionId } = req.body;

  try {
    const response = await axios.post('http://192.168.2.24:11434', {
      prompt: message,
    });

    const botResponse = response.data; 
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    res.status(500).json({ error: 'Failed to get response from Ollama API' });
  }
});

// Endpoint to save chat history
app.post('/api/saveChat', async (req, res) => {
  const { sessionId, messages } = req.body;
  console.log('sessionId:', sessionId);
  console.log('messages:', messages);

  const chat = new Chat({ sessionId, messages });
  try {
    await chat.save();
    res.status(200).json({ message: 'Chat history saved successfully' });
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).json({ error: 'Failed to save chat history' });
  }
});

// Test endpoint to verify server and MongoDB connection
app.get('/api/test', async (req, res) => {
  try {
    const testChat = new Chat({ sessionId: 'test', messages: ['Test message'] });
    await testChat.save();
    res.status(200).json({ message: 'Test document saved successfully' });
  } catch (error) {
    console.error('Error saving test document:', error);
    res.status(500).json({ error: 'Failed to save test document' });
  }
});

/// Endpoint to fetch appointments for a specific date with status "Scheduled"
app.get('/api/appointments', async (req, res) => {
  // const { date } = req.query;
  // console.log('Fetching appointments for date:', date); // Add logging
  const { start_date, end_date } = req.query;
  console.log('Fetching appointments from:', start_date, 'to', end_date); // Add logging

  try {
    // Fetch appointments with status "Scheduled" and the given date
    const appointments = await appointment.find({
      status: 'Scheduled',
      // appointment_date: date
      appointment_date: { $gte: start_date, $lte: end_date }
    });

    console.log('Appointments found:', appointments); // Add logging

    // Fetch customer details for each appointment
    const updatedAppointments = await Promise.all(appointments.map(async (appointment) => {
      console.log('Customer ID:', appointment.customer_id);
      console.log('Technician ID:', appointment.technician_id);

      try {
        const customerData = await Customer.findOne({ id: appointment.customer_id });
        console.log('Customer data:', customerData);

        const staffData = await Staff.findOne({ id: appointment.technician_id });
        console.log('Staff data:', staffData);

        return {
          ...appointment._doc,
          customer_name: customerData ? `${customerData.first} ${customerData.last}` : 'Unknown',
          staff_name: staffData ? `${staffData.full_name}` : 'Unknown'
    
        };
      } catch (error) {
        console.error('Error fetching customer data:', error);
        return {
          ...appointment._doc,
          customer_name: 'Unknown',
          staff_name:'Unknown'
        };
      }
    }));

    console.log('Final Appointments:', updatedAppointments);
    res.status(200).json(updatedAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});


// Endpoint to make a phone call
app.post('/api/makeCall', async (req, res) => {
  const { to, from, url } = req.body;

  try {
    const call = await client.calls.create({
      to,
      from,
      url // URL of the TwiML instructions for the call
    });
    res.status(200).json({ message: 'Call initiated successfully', call });
  } catch (error) {
    console.error('Error making call:', error);
    res.status(500).json({ error: 'Failed to make call' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});