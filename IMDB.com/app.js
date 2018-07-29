var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');


// custom router mounting
const movieRouter = require('./routes/movie');
const actorRouter = require('./routes/actors');
const pagesRouter = require('./routes/pages');
const producerRouter = require('./routes/producer');

// set view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));       


// set static path
app.use(express.static(path.join(__dirname, 'public')));

// var Movie = require('./controllers/moviesController');
// var Actor = require('./controllers/actorsController');
// var producerController = require('./controllers/producerController');

// mounting router
app.use('/',pagesRouter);
app.use('/movie', movieRouter);
app.use('/actor', actorRouter);
app.use('/producer', producerRouter);

// connect to DB
mongoose.connect('mongodb://localhost/IMDB');
var db = mongoose.connection;


app.listen(3000);
console.log('running on 3000');