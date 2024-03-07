const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema(
  {
    building_name: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: 'Address',
    },
    allow_outsider: {
      type: Boolean,
      default: false,
      enum: [true, false],
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

module.exports = mongoose.model('Building', buildingSchema);
