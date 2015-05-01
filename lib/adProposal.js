var express      = require('express');
var router       = express.Router();
var jsonParser   = require('body-parser').json();
var http         = require('http');
var Q            = require('Q');
var User         = require('../models/index').User;
var loc          = require('../lib').userLocation;

/*
* Author: Ahmed Adel
* Publisher send an ad request for a specific user to the IAS, IAS fetch user
interests, IAS sends the user interests to the DSP, the DSP decides which
 ad to send to the publisher, it sends this ad to the IAS, the iAS sends this ad to the publisher.
* request, response 
*/

router.route('/')
  .post(jsonParser, function(request, response){
	
	  var data = {};
	  var options = {
	  	host: 'localhost',
		  port: 4000,
		  path: '/placements',
  	  method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      }
	  };
    var userLocation = getUserLocation(request.body.userIP); 

    data['width']  = request.body.width;
    data['height'] = request.body.height;
		
    if(userLocation['latitude']){
      data['latitude'] = userLocation['latitude'];
    }
    else{
      data['latitude'] = "N/A";
    }
    if(userLocation['longitude']){
      data['longitude'] = userLocation['longitude'];
    }
    else{
      data['longitude'] = "N/A";
    }
    if(userLocation['city']){
      data['city'] = userLocation['city'];
    }
    else{
      data['city'] = "N/A";
    }
    if(userLocation['country']){
      data['country'] = userLocation['country'];
    }
    else{
      data['country'] = "N/A";
    }
    
    User.find(request.body.userId).then(function(user) {
      return user.getInterests();
    }).then(function(interests) {
      var titlesPromises = interests.map(function(interest) {
        var title = interest.dataValues.title;
        return Q(title);
      });
      return Q.all(titlesPromises);
    }).then(function(interestsTitles) {  
      data['tags'] = interestsTitles;
      var req = http.request(options, function(res) {				
			  res.pipe(response);
      });
      var stringData = JSON.stringify({placement: data});
      req.write(stringData);
			req.end();
     });
	});

module.exports = router;
