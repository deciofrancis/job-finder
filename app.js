const express    = require('express');
var exphbs       = require('express-handlebars'); 
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`Express is running at the door ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false}));
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// handle bars
app.set('views', path.join(__dirname, 'views'));


// static folder
app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('index');
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));