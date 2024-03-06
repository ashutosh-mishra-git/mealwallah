const mongoose = require('mongoose');

const mealSchema = mongoose.connect(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String, // separate model for cuisine
      required: true,
    },
    category: {
      type: String,
      required: true, // separate model for category
    },
    mealImage: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.Meals = mongoose.Model('Meals', mealSchema);
