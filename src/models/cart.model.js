const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    items: [
      {
        meal: {
          type: mongoose.Schema.ObjectId,
          ref: 'Meals',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports.Cart = mongoose.Model('Cart', mealSchema);
