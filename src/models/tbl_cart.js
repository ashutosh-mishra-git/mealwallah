const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    cart_total: {
      type: String,
      required: true,
    },
    coupon_code: {
      type: String,
      //   required: true,
    },
    deliver_type: {
      type: String,
      required: true,
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
    timestamp: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);
