var express = require('express');
var jade = require('jade');
var app = express();
var passport = require('passport');
//Routes
var usersRoute = require('./routes/users');
var publishersRoute = require('./routes/publishers');
var actionTypesRoute = require('./routes/actionTypes');
var userActionsRoute = require('./routes/userActions');
var adRequest = require('./routes/adRequest');
var querystring = require('querystring');

var auth = require('./auth.js');
var morgan = require('morgan');


app.use(auth.initialize());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/adRequest', adRequest);
app.use('/users', usersRoute);
app.use('/publishers', publishersRoute);
app.use('/actiontypes', actionTypesRoute);
app.use('/useractions', userActionsRoute);

app.use(passport.initialize());
app.use(passport.session());


app.listen(3000, (function() {
	console.log('Listening on port 3000');
}));


module.exports = app;