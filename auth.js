var passport = require('passport');
var LocalStrategy = require('passport-localapikey').Strategy;
var Publisher = require('./Models/index.js').Publisher;

passport.use(new LocalStrategy(
  function(req, done) {
    process.nextTick(function() {
      Publisher.find({
          where:{apikey: req}
      }).then(function(publisher) {
        if(!publisher) {return done(null, false, {message: 'Unknown apikey: '+ apikey});}
        return done(null, publisher);
      });
    });
  }
));

module.exports = passport;