var http = require('http');
var express = require('express');
var querystring = require('querystring');

// Requiring express exports a function that creates the application. Call it!
var app = express();


var adRequest = require('./routes/adRequest');
app.use('/adRequest',adRequest);


app.listen(3000, function() {
  console.log("Listening on port 3000 \n");
});