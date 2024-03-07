const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    add1: {
      type: String,
      required: true,
    },
    add2: {
      type: String,
      //   required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    phone_nu: {
      type: String,
      required: true,
    },
    deleted_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    last_modified_by: {
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

module.exports = mongoose.model('Address', addressSchema);
