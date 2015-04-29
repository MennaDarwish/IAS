//Actually registering (signup) the publisher.
var bcrypt = require('bcryptjs');
var  Q = require('q'); // to return a promise
var Publisher = require('../models/index.js').Publisher;

exports.localReg = function (name,channel,domain,username,apikey,password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var publisher = {
    "name": name,
    "channel": channel,
    "domain": domain,
    "email": username,
    "password": hash,
    "apikey": apikey
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

exports.localsignin = function (username, password) {
  //throw new Error ("publisher auth localsignin");
  var deferred = Q.defer();
  Publisher.find({ where: {email: username} })
    .then(function (result){
      if (result !== null) {
        console.log('result');
        console.log(result);
        var hash = result.password;
        console.log(hash);
        console.log(bcrypt.compareSync(password, hash));
        if (bcrypt.compareSync(password, hash)) {
          deferred.resolve(result);
        } else {
            console.log('PASSWORDS NOT MATCH');
            deferred.resolve(false);
          }
      } else {
          console.log('COULD NOT FIND USER IN DB FOR SIGNIN');
          deferred.resolve(false);
        }
    });
  return deferred.promise;
};