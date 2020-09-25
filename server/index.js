const express = require('express');
const db = require('mongoose');
const router = require('./router');
const cors = require('cors');

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

db.connect('mongodb://localhost:27017/kidsBudgeting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connection.once('open', () => {
  console.log('db is up and running 🚀');
  app.listen(port, () => {
    console.log(`Server runnig on --> http://localhost:${port}`);
  });
});
