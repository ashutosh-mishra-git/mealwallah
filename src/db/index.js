const mongoose = require('mongoose');
const { DB_NAME } = require('../constants');
// console.log(DB_NAME);

const connectDB = async () => {
  console.log(DB_NAME);
  try {
    mongoose.connect('');
  } catch (error) {
    console.log('Connection failed', error.message);
  }
};

module.exports = connectDB;
