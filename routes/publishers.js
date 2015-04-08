var express  = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({ extended: false });
var router = express.Router();
var Publisher = require('../models/index.js').Publisher;
var publisherAuthentication = require('../lib/publisherAuthentication.js');


passport.use('local-signup', new passportLocal(
  {passReqToCallback : true}, 
 function(req, username, password, done) {
    publisherAuthentication.localReg(username, password)
    
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
   }
    
  ));
var publisherBuilder = function(req, res, next) {
  var publisher = {
    name: req.body.name,
    domain: req.body.domain,
    email: req.body.email,
    channel: req.body.channel
  }
  req.body.publisher = publisher;
  next();
}
router.route('/')
  .post(urlEncoded, publisherBuilder, function(req, res) {
    var publisher = req.body.publisher;
    Publisher.create(publisher).then(function(createdPublisher) {
      res.status(201).json({status: 'created', publisherId: createdPublisher.dataValues.id});
    }, function(err) {
      res.status(404).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });
router.route('/sign_up')
  .get(function(req, res) {
    res.render('layout', {
      title : 'Publisher Sign Up'
    })
  });
 router.route('/sign_up')
  .post(passport.authenticate('local-signup'));

module.exports = router;
