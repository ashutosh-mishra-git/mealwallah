const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  items: [
    {
      meal: {
        type: mongoose.Schema.ObjectId,
        ref,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});
