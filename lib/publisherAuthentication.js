var bcrypt = require('bcryptjs');
   var  Q = require('q');
   var Publisher = require('../models/index.js').Publisher;

exports.localReg = function (email,password) {
  var deferred = Q.defer();
  // var hash = bcrypt.hashSync(password, 8);
  var publisher = {
   "name": null,
   "domain":null,
   "email":username,
   "channel": null

    
  }
 
  Advertiser.find({ where: {email: username} })
  .then(function (result){ 
    if(result != null){
    console.log('username already exists');
    deferred.resolve(false);} 
    else {
      Publisher.create(publisher)
        .then(function (createdPublisher) {
          console.log("Publisher: " + createdPublisher);
          deferred.resolve(publisher);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
    }
     
  });
return deferred.promise;
};
