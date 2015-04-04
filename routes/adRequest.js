var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParsedUrl = bodyParser.urlencoded({ extended: true });     // to support URL-encoded bodies
router.route('/')
.post(bodyParsedUrl,  function(request, response){ //post request from publisher containing user and ad info
	
	//var userID = request.body.userID
	var adSize = request.body.adSize;
	var offeredPrice = request.body.offeredPrice;
	

	request.on('finish', function(){ //when request is done sending, start forwarding to DSP

		var data = { //data that will be sent in the request
      
      size: size,
      //userID : userID
      //offeredPrice: offeredPrice,
      interests: //var interests = fetch user interests

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

        var body += chunk; //save the response from the DSP in an object
    });
});

req.write(data);
req.end();


	});
	response.send(body);  //send the DSP's response back to the publisher


});

module.exports = router;