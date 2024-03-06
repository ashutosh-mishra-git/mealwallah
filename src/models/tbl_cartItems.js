const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    meal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Meals',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.Cart = mongoose.Model('Cart', mealSchema);

[
  { name: 'rajma', qt: 2 },
  { name: 'pudi', qt: 5 },
];
