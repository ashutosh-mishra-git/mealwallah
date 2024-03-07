const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
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

userSchema.pre('save', async function (next) {
  if (isModified(this.password)) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
  return next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = function () {
  return jwt.sign(
    { _id: _id, username: username, phoneNum: phoneNum },
    process.env.JWT_AUTH_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.genrateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, phoneNum: this.phoneNum },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

module.exports = mongoose.model('User', userSchema);
