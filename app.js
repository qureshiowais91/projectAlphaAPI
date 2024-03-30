const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const {auth} = require("./routes/auth");
require("dotenv").config()


const app = express();

// Your code goes here
app.use(json());

// Connect to the database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use("/user", auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;