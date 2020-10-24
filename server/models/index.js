const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/dimes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
