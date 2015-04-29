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
var localStrategy = require('../lib/localStrategy.js');
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
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/publishers/profile',
    failureRedirect: '/publishers/signup'
}));

  router.route('/signin')
    .get(function(req, res) {
      res.render('signin', {
        title: 'Publisher Sign In'
      })
    })
    .post(passport.authenticate('local-signin', {
      successRedirect: '/publishers/profile',
      failureRedirect: '/publishers/signin'
    }));

module.exports = router;