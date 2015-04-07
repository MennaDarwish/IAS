var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParsedUrl = bodyParser.json();     // to support URL-encoded bodies
var Impression = require('../models/index.js').Impression;

router.route('/')
.post(bodyParsedUrl,  function(request, response){ //post request from publisher containing user and ad info
	
  //var userID = request.body.userID
	var adSize = request.body.adSize;
	//var offeredPrice = request.body.offeredPrice;
  var UserId = request.body.userId;
  var PublisherId = request.body.publisherId;

  //set unique url for clicking on this impression
 
	

	request.on('finish', function(){ //when request is done sending, start forwarding to DSP
    var data = { //data that will be sent in the request to dsp
      size: size,
      //userID : userID
      //offeredPrice: offeredPrice,
      //interests: //var interests = fetch user interests.
      };

    var options = { // request options
    host: //DSP,
    port: //DSP PORT NUMBER,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};
		
		var req = http.request(options, function(res) {
    //res.setEncoding('utf8');
    res.on('data', function (chunk) {
        var adId = res.body.adId, 
        var ad = res.body.ad,
        var body += chunk;  //save the response from the DSP in an object
        
    });
    res.on('end', function(){
      getClick(body);
    })
});

req.write(data); // send data to dsp
req.end();


});
	
  var impression = {
    publisherId : PublisherId,
    userId : UserId,
    adId : adId;

  }

  //Creating Impression
  Impression.create(impression).then(function(createdImpression){
      res.status(201).json({status : 'created' , impressionId: createdImpression.dataValues.id});
    }), function(err){
      res.status(400).json({status: 'Error', message : 'Something went wrong ' + err});
    })

   //send the DSP's response back to the publisher
  response.send(body);
});
var getClick = function (body) {
  Impression.find(where: Sequelize.and(userId = UserId, adId = adId, publisherId = PublisherId)).then(function(impression){
  if(!impression) res.sendStatus(404);
  res.sendStatus(200).json({status: 'finished'});
  var newImpressionId = impression;
 }, function(err){
  res.sendStatus(404).json({status: 'Error', message: 'Something went wrong' + err});
 });
  var uniqueUrl = '/clicksRoute/?' + querystring.stringify({impressionId: newImpressionId, ';', ':'});
  var link = document.createElement("LINK");
  link.setAttribute("href", uniqueUrl);
  body.html.appendChild(link);
  ;
};

module.exports = router;