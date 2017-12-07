var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();
let passport = require('passport');
var dotenv = require('dotenv');

//load variables from .env
/*const result = dotenv.config();

if (result.error) {
  throw result.error
};*/

require('./backend/models/Comment');
require('./backend/models/Tweet');
require('./backend/models/User');
require('./backend/models/Subcomment');
require('./backend/config/passport')


var index = require('./backend/routes/index');
var users = require('./backend/routes/users');

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {  useMongoClient: true });

// Start front-end
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 4200);

// view engine setup
app.set('views', path.join(__dirname +'/backend', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', index);
app.use('/API/users', users);

//elke call naar index brengen
app.all("*", (req, res) => {
    res.status(200).sendFile(`${path.join(__dirname, 'dist')}/index.html`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
