const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

//cors
app.use(
  cors({
    origin: process.env.CORS_ORIGiN,
    credential: true,
  })
);

//middleware
app.use(express.json({ limit: '16KB' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

module.exports = app;
