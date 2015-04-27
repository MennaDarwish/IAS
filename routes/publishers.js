var express  = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({ extended: false });
var uuid = require('node-uuid');
var auth = require('../auth.js');
var router = express.Router();
var id = uuid.v4();
var secret = uuid.v4();
var passport = require('passport');
var passportLocal = require('passport-local');
var publisherAuth = require('../lib/publisherAuth.js')

var Publisher = require('../Models/index.js').Publisher;
var publisherBuilder = function(req, res, next) {
  var publisher = {
    name: req.body.name,
    domain: req.body.domain,
    email: req.body.email,
    channel: req.body.channel,
    apikey: id + ':' + secret
  }
  req.body.publisher = publisher;
  next();
}

// Use the LocalStrategy within Passport to Register/"signup" advertisers.
passport.use('local-signup', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    publisherAuth.localReg(req.body.name,req.body.channel,req.body.domain,username, password)
      .then(function (user) {
        if (user) {
          console.log('LOGGED IN AS: ' + user.name);
          req.session.success = 'You are successfully logged in ' + user.name + '!';
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
//passport session setup.
passport.serializeUser(function(user, done) {
  console.log('serializing ' + user.name);
  done(null, user);
});


passport.deserializeUser(function(obj, done) {
  console.log('deserializing ' + obj);
  done(null, obj);
});
  
router.route('/')
  .post(urlEncoded, publisherBuilder, function(req, res) {
    var publisher = req.body.publisher;
    Publisher.create(publisher).then(function(createdPublisher) {
      res.status(201).json({status: 'created', publisherId: createdPublisher.dataValues.id, 
        apikey: createdPublisher.dataValues.apikey});
    }, function(err) {
      res.status(404).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

router.route('/profile')
  .get(function(req,res){
    res.render('profile',{
      title: 'Publisher Profile'
    })
  });

router.route('/signup')
  .get(function(req, res) {
    res.render('homepage', {
      title : 'Publisher Sign Up'
    })
  });

  router.route('/signup')
    .post(passport.authenticate('local-signup', {
      successRedirect: '/publishers/profile',
      failureRedirect: '/publishers/profile'
  }));

router.route('/signin')
  .get(function(req, res) {
    res.render('signin', {
      title : 'Publisher Sign In'
    })
  })
  .post(function(req, res) {

  });

module.exports = router;