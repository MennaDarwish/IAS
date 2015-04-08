var express = require('express'); 
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParsedUrl = bodyParser.json();     
var Impression = require('../models/index.js').Impression;

var AdInfoBuilder = function(req, res, next){
	var adInfo = {
		userId: req.body.userId;
		adId: req.body.adId;
		publisherId: req.body.publisherId;
		adHtml: req.body.html;
	}
	req.body.ad = adInfo;
	next();
}

router.route('/')
.post(bodyParsedUrl, AdInfoBuilder, function(req, res){
	var UserId = req.body.ad.userId;
	var PublisherId = req.body.ad.publisherId;
	var AdId = req.body.ad.adId;
	Impression.find(where: Sequelize.and(userId = UserId, adId = AdId, publisherId = PublisherId)).then(function(impression){
  		if(!impression) res.sendStatus(404);
 		 res.sendStatus(200).json({status: 'finished'});
 		 var newImpressionId = impression;
 		}, function(err){
  			res.sendStatus(404).json({status: 'Error', message: 'Something went wrong' + err});
 		});
  		var uniqueUrl = '/clicksRoute/?' + querystring.stringify({impressionId: newImpressionId, ';', ':'});
 	    var link = document.createElement("LINK");
  		link.setAttribute("href", uniqueUrl);
  		var html = req.body.ad.html;
  		html.appendChild(link);
  		res.send(html);
})