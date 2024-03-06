const mongoose = require('mongoose');

const cafe_to_categorySchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    cafe: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cafe',
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model('CafetoCategory', cafe_to_categorySchema);
