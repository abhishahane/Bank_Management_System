const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const { MONGODB_URL } = process.env;

// database connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('database connection successful...'))
  .catch(() => console.log('database connection failed...'));
