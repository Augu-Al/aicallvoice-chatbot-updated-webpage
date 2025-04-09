const mongoose = require('mongoose');

// Define a schema and model for customers
const customerSchema = new mongoose.Schema({
  id: String,
  first: String,
  last: String,
  email: String,
  phone: String,
  member: Boolean,
  loyalty_points: Number
}, { collection: 'customer' }); // Specify the collection name

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;