require('dotenv').config()
const mongoose = require('mongoose')

const connection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
  }
};

module.exports = connection;