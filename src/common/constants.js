

// export const API_URL = 'http://192.168.2.24:11434/api/generate';
// export const MODEL_NAME = 'AIvoicecall_gemma2:latest';
// export const API_IP='http://192.168.2.24:11434/';
// export const API_CHAT_GENERATE = 'api/generate'
// export const API_CHAT_SAVE = 'api/saveChat'
// export const API_CHAT_HISTORY = 'api/chatHistory'


module.exports = {
    dbUsername: 'root', // Replace with your MongoDB username
    dbPassword: 'aivoicecall', // Replace with your MongoDB password
    dbHost: '192.168.2.24',
    dbPort: '27017',
    dbName: 'nailssalon2',
    API_CHAT_SAVE: 'http://localhost:4000/api/saveChat',
    API_URL: 'http://192.168.2.24:11434/api/generate',
    API_APPOINTMENT :'http://localhost:4000/api/appointments',
    MODEL_NAME: 'AIvoicecall_gemma2:latest',
    twilioAccountSid: 'ACfefb17b6da0e78eb9dddd0f7bc1f0414',
    twilioAuthToken:'3659e0a51bc55c4f109d3d3adbaea2f6',
    twilioPhoneNumber:'+16474925262'
  };

// export const API_CHAT_SAVE = 'http://localhost:4000/api/saveChat';
// export const API_URL = 'http://192.168.2.24:11434/api/generate'
// export const MODEL_NAME = 'AIvoicecall_gemma2:latest';
