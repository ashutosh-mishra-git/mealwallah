const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema(
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
    deleted_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    last_modified: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    deleted: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    active: {
      type: Boolean,
      default: true,
      enum: [true, false],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.Model('CartItem', cartItemSchema);
