const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const { auth } = require('./routes/auth');
const { school } = require('./routes/school');
const { validation } = require('./routes/validation');
const { profile } = require("./routes/profile")
const { parent } = require("./routes/parent")
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

app.use('/api', validation);
app.use('/api', auth);
app.use("/api", school);
app.use("/api", profile);
app.use("/api", parent)
// app.use('/api', organization);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;