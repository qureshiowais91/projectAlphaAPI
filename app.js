const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
// ROUTES
const { auth } = require('./routes/auth');
const { school } = require('./routes/school');
const { validation } = require('./routes/validation');
const { profile } = require('./routes/profile');
const { parent } = require('./routes/parent');
const { admin } = require('./routes/admin');
const { user } = require('./routes/user');
// ROUTES

// Error Handler
const customErrorHandler = require('./middleware/errorHandler');

const cors = require('cors');
require('dotenv').config();
const app = express();

// Your code goes here
app.use(json());
app.use(
  cors({
    origin: '*',
  })
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/', validation);
app.use('/', auth);
app.use('/', school);
app.use('/', profile);
app.use('/', parent);
app.use('/', admin);
app.use('/', user);
app.use(customErrorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
