const mongoose = require('mongoose');

const mealSchema = mongoose.connect({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mealImage: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});
