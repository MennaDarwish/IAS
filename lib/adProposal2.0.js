var express       = require('express');
var router        = express.Router();
var bodyParsedUrl = require('body-parser').urlEncoded({extended: true});
var UserInterest  = require('../models/index.js').UserInterest;
var http          = require('http');
var request       = require('request');
var inspect       = require('eyespect').inspector();

router.route('/')
.post(bodyParsedUrl, function(request, response){
	
	var adSize 	     = request.body.adSize;
	var offeredPrice = request.body.offeredPrice;
	var data         = {};
	
	var options = {
		host: 'localhost',
		port: 4000,
		body: data,
		path: '/',
		method: 'POST'
	};
	
	UserInterest.find({where:{userId: request.body.userId}}).then(function(userInterests) {
		if(!userInterests) return response.sendStatus(404);
		data['size'] = adSize;
		data['interests'] = userInterests;
		data['offeredPrice'] = offeredPrice;
		data['userId'] = userId;
		request(options, function(err, res, body) {
			if(err) {
				inspect(err, 'error posting JSON')
				return;
			}
			response.send(res);
		})
	});
});

module.exports = router;
