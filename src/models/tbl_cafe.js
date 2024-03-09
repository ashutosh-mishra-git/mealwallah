const mongoose = require('mongoose');

const cafeSchema = mongoose.Schema(
  {
    cafe_name: {
      type: String,
      required: true,
    },
    building_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Building',
    },
    owner_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Vendor',
    },
    floor: {
      type: Number,
      required: true,
    },
    allow_outsider: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    has_microwave: {
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

module.exports = mongoose.model('Cafe', cafeSchema);
