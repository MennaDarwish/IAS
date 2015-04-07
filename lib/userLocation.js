var satelize = require('satelize');

var getUserLocation = function(IP) {
	satelize.satelize({ip:IP}, function(err, geoData) {
  
  var obj = JSON.parse(geoData);//wrap the data in js object
  var userLocation = obj.country;
  
   
});
	return userLocation;

};

exports.getUserLocation = getUserLocation;
