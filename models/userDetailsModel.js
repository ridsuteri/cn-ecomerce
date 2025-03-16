// models/userDetailsModel.js
const mongoose = require('mongoose');

// Define the User Details Schema
const userDetailsSchema = new mongoose.Schema({
  profileData: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  profilePic: { type: String },
  address: { type: String },
  personalDetails: { type: Object }
});

// Create a UserDetails Model
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails; // Export the UserDetails model