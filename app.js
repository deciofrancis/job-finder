const express    = require('express');
var exphbs       = require('express-handlebars'); 
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Job        = require('./models/Job');

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`Express is running at the door ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false}));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');


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

  Job.findAll({order: [
    ['createdAt', 'DESC']
  ]})
  .then(jobs => {
    res.render('index', {
      jobs
    });

  });
  
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));