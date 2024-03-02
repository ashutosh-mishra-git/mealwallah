const mongoose = require('mongoose');
const { DB_NAME } = require('../constants');

const connectDB = async () => {
  db_url = `mongodb+srv://mealwallah:dYDElQsOBMZu64Ok@cluster0.vn0ojj2.mongodb.net/${DB_NAME}`;

  try {
    mongoose.connect(db_url);
  } catch (error) {
    console.log('Connection failed', error.message);
  }
};

module.exports = connectDB;
