const mongoose = require('mongoose');

const cafe_to_couisineSchema = mongoose.Schema(
  {
    cafe: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cafe',
    },
    couisine: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cousine',
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model('Cafetocousine', cafe_to_couisineSchema);
