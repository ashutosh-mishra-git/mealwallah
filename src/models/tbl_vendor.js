const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema(
  {
    vendor_name: {
      type: String,
      required: true,
    },
    phone_nu: {
      type: String,
      required: true,
    },
    aadhaar_nu: {
      type: String,
      required: true,
    },
    pan_nu: {
      type: String,
      required: true,
    },
    food_license_nu: {
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

module.exports = mongoose.model('Vendor', vendorSchema);
