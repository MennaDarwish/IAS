var Impression = require('../models/index.js').Impression;
var getClick = function(req){
	var UserId = req.body.userId;
	var PublisherId = req.body.publisherId;
	var AdId = req.body.adId;
	return {Impression.find(where: Sequelize.and(userId = UserId, adId = AdId, publisherId = PublisherId)).then(function(impression){
  		if(!impression) res.sendStatus(404);
 		 res.sendStatus(200).json({status: 'finished'});
 		 var newImpressionId = impression;
 		 var uniqueUrl = '/clicksRoute/?' + querystring.stringify({impressionId: newImpressionId, ';', ':'});
 	     var link = document.createElement("LINK");
  		 link.setAttribute("href", uniqueUrl);
  		 var html = req.body.html;
  		 html.appendChild(link);
  		 return html 
 		}, function(err){
  			res.sendStatus(404).json({status: 'Error', message: 'Something went wrong' + err});
 		});
  		}
}