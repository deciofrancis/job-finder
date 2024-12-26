const express    = require('express');
var exphbs       = require('express-handlebars'); 
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Job        = require('./models/Job');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

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

  let search = req.query.job;
  let query = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if(!search) {
    Job.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render('index', {
        jobs
      });
    })
    .catch(err => console.log(err));
  } else {
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render('index', {
        jobs, search
      });
    })
    .catch(err => console.log(err));
  }
  
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));