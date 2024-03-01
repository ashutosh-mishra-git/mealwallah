const dotenv = require('dotenv');
const connect_db = require('./db/index');
const app = require('./app');

connect_db();

app.listen(() => {
  console.log('server is up');
});
