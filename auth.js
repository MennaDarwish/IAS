var passport = require('passport');
var LocalStrategy = require('passport-localapikey').Strategy;
var Publisher = require('../models/index.js').Publisher;


passport.use(new LocalStrategy(
  function(req.params.apikey, done) {
    process.nextTick(function() {
      Publisher.find({
          where:{apikey: req.params.apikey}
      }).then(function(err, publisher) {
        if(err) { return done(err);}
        if(!publisher) {return done(null, false, {message: 'Unknown apikey: '+ apikey});}
        return done(null, publisher);
      });
    });
  }
  ));

module.exports = passport;