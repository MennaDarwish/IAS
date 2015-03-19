var express = require('express');
var app = express();

var usersRoute = require('./routes/users');
var publishersRoute = require('./routes/publishers');

app.use('/users', usersRoute);
app.use('/publishers', publishersRoute);

module.exports = app;
