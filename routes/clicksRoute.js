var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Click = require('../models/index').Click;
var urlEncoded = bodyParser.urlEncoded({extended: false});
var router = express.Router();

var clickInfo = function(req, res, next){
		req.body.click  = impressionId: req.body.impressionId;
	
	next();
}





router.route('/')
.post(urlEncoded, clickInfo, function(req, res) {
	var click = req.body.click;
	Click.create(click).then(function(createdClick) {
		res.status(201).json({status: 'created', message: 'redirecting to url'});
	var redirectedUrl = 
	sequelize.query('SELECT redirectUrl FROM Impression WHERE click.impressionId = impressionId',
	{type: sequelize.QueryTypes.SELECT});
	res.redirect(301, redirectedUrl);

}, function(err) {
	res.status(404).json({status: 'ERROR', message: 'Something went wrong' + err});

	

});

