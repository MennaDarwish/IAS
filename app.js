var express = require('express');
var app = express();
var usersRoute = require('./routes/users');
var publishersRoute = require('./routes/publishers');
var actionTypesRoute = require('./routes/actionTypes');
var userActionsRoute = require('./routes/userActions');
var express = require('express');
var querystring = require('querystring');
var adRequest = require('./routes/adRequest');



app.use('/adRequest',adRequest);
app.use('/users', usersRoute);
app.use('/publishers', publishersRoute);
app.use('/actiontypes', actionTypesRoute);
app.use('/useractions', userActionsRoute);

module.exports = app;
