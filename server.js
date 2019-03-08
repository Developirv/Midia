var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var methodOverride = require('method-override');

var monk = require('monk');
var db = monk('localhost:3000/newcreator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/creators');

var app = express();


// load the env 
require('dotenv').config();

// connect to the MongoDB 
require('./config/database');
// configure Passport
require('./config/passport');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


// Mounting middleware

app.use(session({
  secret: 'jGxPIHo5-S58mSWOM7jukRO2',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Make db accessible
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
