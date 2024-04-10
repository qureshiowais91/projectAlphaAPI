const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const { auth } = require("./routes/auth");
const { teacher } = require("./routes/teacher")
const { organization } = require("./routes/organization")
const cors = require('cors')
require("dotenv").config({ path: __dirname + '/.env' })


const app = express();

// Your code goes here
app.use(json());
app.use(cors())
// Connect to the database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use("/api", auth);
app.use("/api", teacher);
app.use("/api", organization);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;