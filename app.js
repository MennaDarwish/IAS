var express = require('express');
var jade = require('jade');

var app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));


app.use(express.static(__dirname + '/public'));


var usersRoute = require('./routes/users');
var publishersRoute = require('./routes/publishers');
var express = require('express');
var querystring = require('querystring');
var adRequest = require('./routes/adRequest');


app.use('/adRequest',adRequest);
app.use('/users', usersRoute);
app.use('/publishers', publishersRoute);

module.exports = app;
