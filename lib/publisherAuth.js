//Actually registering (signup) the publisher.
var bcrypt = require('bcryptjs');
var  Q = require('q'); // to return a promise
var Publisher = require('../models/index.js').Publisher;

exports.localReg = function (name,channel,domain,username,password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var publisher = {
    "name": name,
    "channel": channel,
    "domain": domain,
    "email": username,
    "apikey": hash
    // password?
  }
  //check if username is already assigned in our database
  Publisher.find({ where: {email: username} })
    .then(function (result) { //case in which user already exists in db
      if (result != null) {//username already exists
        console.log('username already exists');
        deferred.resolve(false);
      } else {
          Publisher.create(publisher)
            .then(function (createdPublisher) {
              console.log('Publisher: ' + createdPublisher);
              deferred.resolve(publisher);
            })
            .fail(function (err) {
              console.log('PUT FAIL:' + err.body);
              deferred.reject(new Error(err.body));
            });
        }
    });
  return deferred.promise;
};
