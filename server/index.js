/* eslint no-console: 0 */

const express = require('express');
const mongoose = require('./models/index');
const router = require('./router');
const cors = require('cors');

const port = 3001;
const app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('---> Connected to MongoDB 🚀'); //
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on --> http://localhost:${port}`);
});
