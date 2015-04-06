var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Click = require('../models/index').Click;
var Impression = require('../models/index').Impression;
var urlEncoded = bodyParser.urlEncoded({extended: false});
var router = express.Router();

var clickInfo = function(req, res, next){
		var thisClick = {impressionId: req.body.impressionId;}
		req.body.click = thisClick;
	
	next();
}





router.route('/')
.post(urlEncoded, clickInfo, function(req, res) {
	var click = req.body.click;
	Click.create(click).then(function(createdClick) {
		res.status(201).json({status: 'created', message: 'redirecting to url'});
	Impression.find({where: {impressionId: click.impressionId }}).then(function(redirectingUrl){
		if(!redirectingUrl) res.sendStatus(404);
		res.redirect(301, redirectingUrl);
	}, function(err){
		res.sendStatus(404).json({status: 'ERROR', message: 'Something went wrong' + err});
	});


}, function(err) {
	res.status(404).json({status: 'ERROR', message: 'Something went wrong' + err});

	

});

