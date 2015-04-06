var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var bodyParsedUrl = bodyParser.urlencoded({ extended: true });     // to support URL-encoded bodies
var Impression = require('../models/index.js').Impression;
var http = require('http');

router.route('/')
.post(bodyParsedUrl,  function(request, response){ //post request from publisher containing user and ad info
	
  //var userID = request.body.userID
	//var adSize = request.body.adSize;
	//var offeredPrice = request.body.offeredPrice;
  var UserId = request.body.userId;
  var PublisherId = request.body.publisherId;
	

	request.on('finish', function(){ //when request is done sending, start forwarding to DSP
    var data = { //data that will be sent in the request to dsp
      //size: size,
      userID : UserID
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
      res.status(201).json({status : 'created'});
    }), function(err){
      res.status(400).json({status: 'Error', message : 'Something went wrong ' + err});
    })
 //send the DSP's response back to the publisher
  response.send(body);
});

module.exports = router;