var express = require('express');
var jade = require('jade');
var app = express();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
//Routes
var usersRoute = require('./routes/users');
var publishersRoute = require('./routes/publishers');
var actionTypesRoute = require('./routes/actiontypes');
var userActionsRoute = require('./routes/useractions');
var adRequest = require('./routes/adRequest');
var querystring = require('querystring');

app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var auth = require('./auth.js');
var morgan = require('morgan');

app.use(auth.initialize());
app.set('views', __dirname + '/views');
app.set('public',__dirname + '/public');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/adRequest',adRequest);
app.use('/users', usersRoute);
app.use('/publishers', publishersRoute);
app.use('/actiontypes', actionTypesRoute);
app.use('/useractions', userActionsRoute);

app.listen(3000, function(){
   console.log('Listening on port 4000');
});


module.exports = app;