  //configuring local strategy
var passport = require('passport');
var passportLocal = require('passport-local');
var publisherAuth = require('./publisherAuth.js');
var uuid = require('node-uuid');
var apikey = uuid.v4();

// Use the LocalStrategy within Passport to Register/"signup" publishers.
passport.use('local-signup', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    publisherAuth.localReg(req.body.name,req.body.channel,req.body.domain,username, apikey ,password)
      .then(function (user) {
        if (user) {
          console.log('LOGGED IN AS: ' + user.email);
          req.session.success = 'You are successfully logged in ' + user.username + '!';
          done(null, user);
        }
        if (!user) {
          console.log('COULD NOT LOG IN');
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          done(null, user);
        }
      })
      .fail(function (err){
          console.log(err.body);
      });
  }
));

// Use the LocalStrategy within Passport to login publishers.
passport.use('local-signin', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    publisherAuth.localsignin(username, password)
      .then(function (user) {
        if (user) {
          console.log('LOGGED IN AS: ' + user.dataValues.name);
          req.session.success = 'You are successfully logged in ' + user.dataValues.name + '!';
          done(null, user);
        }
        if (!user) {
          console.log('COULD NOT LOG IN');
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          done(null, user);
        }
      })
      .fail(function (err){
        console.log(err.body);
      });
  }
));

module.exports=passportLocal;