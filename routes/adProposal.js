var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParsedUrl = bodyParser.urlEncoded({extended: true});
var UserInterest = require('../models/index.js').UserInterest;

router.route('/')
.post(bodyParsedUrl, function(request, response){
	
	var adSize = request.body.adSize;
	var offeredPrice = request.body.offeredPrice;
	var dspRes = {};
	var data = {};
	var options = {
		host: 'localhost',
		port: 4000,
		path: '/',
		method: 'POST'
	};
	
	UserInterest.find({where:{userId: request.body.userId}}).then(function(userInterests) {
		if(!userInterests) return response.sendStatus(404);
		request.on('finish', function(){			
			data['size'] = adSize;
			data['interests'] = userInterests;
			data['offeredPrice'] = offeredPrice;
			data['userId'] = userId;
			var req = http.request(options, function(res) {
				req.on('data', function (chunk) {
					dspRes = chunk;
				});
				req.write(data);
				req.end();
			});
		});
		response.send(chunk);
	});
});

module.exports = router;