const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sessionId: String,
  messages: Array,
  timestamp: { type: Date, default: Date.now }
}, { collection: 'chat_history' }); // Specify the collection name

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;