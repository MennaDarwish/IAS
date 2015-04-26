//configuring local strategy
var passport = require('passport');
var passportLocal = require('passport-local');
var publisherAuth = require('./publisherAuth.js');

// Use the LocalStrategy within Passport to Register/"signup" publisher.
passport.use('local-signup', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    publisherAuth.localReg(req.body.name,req.body.channel,req.body.domain,username, password)
      .then(function (user) {
        if (user) {
          console.log('LOGGED IN AS: ' + user.firstName);
          req.session.success = 'You are successfully logged in ' + user.firstName + '!';
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