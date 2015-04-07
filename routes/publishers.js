var express  = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({ extended: false });
var uuid = require('node-uuid');
var auth = require('../auth.js');
var router = express.Router();

var id = uuid.v4();
var secret = uuid.v4();

var Publisher = require('../models/index.js').Publisher;
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

router.route('/')
  .post(urlEncoded, publisherBuilder, passport.authenticate('localapikey', { session: false }), function(req, res) {
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

module.exports = router;