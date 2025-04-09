const mongoose = require('mongoose');

// Define a schema and model for customers
const staffInfo = new mongoose.Schema({
  id: String,
  full_name: String,
  last: String,
  phone_number: String,
  working_hours: String,
  working_days: String,
  skills: String
}, { collection: 'staff_info' }); // Specify the collection name

const Staff = mongoose.model('staffInfo', staffInfo);

module.exports = Staff;