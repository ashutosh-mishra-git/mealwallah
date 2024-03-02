const dotenv = require('dotenv');
const connect_db = require('./db/index');
const app = require('./app');

dotenv.config();
const PORT = process.env.PORT || 6000;

connect_db();

app.listen(PORT, () => {
  console.log(`server is up ${PORT}`);
});
