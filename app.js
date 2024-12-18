const express = require('express');
const app     = express();
const db      = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`Express is running at the door ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false}));

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the bank");
  })
  .catch(err => {
    console.log("An error occurred while connecting.");
  });

// routes
app.get('/', (req, res) => {
  res.send("It's working");
})

// jobs routes
app.use('/jobs', require('./routes/jobs'));