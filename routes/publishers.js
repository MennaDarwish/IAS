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
var publisherAuth = require('../lib/publisherAuth.js');
var localStrategy = require('../lib/localStrategy'); 
var actiontypes = require('../routes/actiontypes.js');
var Publisher = require('../Models/index.js').Publisher;
var viewActionType = require('../lib/viewActionType.js');

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
      res.status(201).json({status: 'created', publisherId: createdPublisher.dataValues.id, apikey: createdPublisher.dataValues.apikey});
    }, function(err) {
      res.status(404).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

//Salma's part (creating a profile)
router.route('/profile')
  .get(function(req,res){
    if(req.isAuthenticated()) {
      viewActionType.viewActionTypes(req.user.id).then(function(result){
        res.render('profile',{
          name: req.user.name,
          title: 'Publisher Profile',
          actiontypes: result
        });
      });
    } else {
      res.redirect('/publishers/signup');
    }
  });

router.route('/createaction')
  .get(function(req,res) {
    res.render('createAction', {
      title: 'Create Action'
    });
  });

  //router.route('/actiontypes')
  //.post(function(req,res){
    // if (req.isAuthenticated()){
      //actiontypes.create({actionName: req.body.actionName, actionWeight: req.body.actionWeight, publiserhId: req.user.id});
      //console.log(req.user.id);
      //res.redirect('/actiontypes'); // fix this
    //}
    //else {
    //res.redirect('/publishers/homepage');
    //}
  //});

//rendering view signin whenever the publisher wants to signin
  //(salma's part)
  router.route('/signin')
    .get(function(req,res){
      res.render('signin' , {
        title : 'Publisher Sign in'
      })
    })
    .post(passport.authenticate('local-signin',{
      successRedirect : '/publishers/profile',
      failureRedirect : '/publishers/signin'
    }));

//rendering view homepage whenever the publisher wants to signup
router.route('/signup')
  .get(function(req, res) {
    res.render('homepage.ejs', {
      title : 'Publisher Sign Up'
    })
  })
  .post(passport.authenticate('local-signup', {
      successRedirect: '/publishers/profile',
      failureRedirect: '/publishers/signup'
  }));

  router.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/publishers/signup');
  });

module.exports = router;