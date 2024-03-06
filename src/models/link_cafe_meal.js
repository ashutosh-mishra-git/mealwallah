const mongoose = require('mongoose');

const cafe_to_mealSchema = mongoose.Schema(
  {
    cafe: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cafe',
    },
    meal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Meal',
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model('Cafetomeal', cafe_to_mealSchema);
