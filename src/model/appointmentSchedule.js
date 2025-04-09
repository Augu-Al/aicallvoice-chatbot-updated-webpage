const mongoose = require('mongoose');

// Define a schema and model for appointments
const appointmentSchema = new mongoose.Schema({
  appointment_id: String,
  appointment_date: String,
  appointment_time: String,
  duration_minutes: Number,
  status: String,
  service_type: String,
  notes: String,
  created_at: String,
  updated_at: String,
  technician_id: String,
  customer_id: String,
  total_slot: Number
}, { collection: 'appiontment_schedule'}); // Specify the collection name

const appointment = mongoose.model('appointment', appointmentSchema);

module.exports = appointment;