var express = require('express');

var User = require('../models/index').User;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var router = express.Router();

var userBuilder = function(req, res, next) {
  var user = {
    name: req.body.name,
    email: req.body.email,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    publisherId: req.body.publisherId
  };
  req.body.user = user;
  next();
}
router.route('/')
  .post(jsonParser, userBuilder, function(req, res) {
    var user = req.body.user;
    User.create(user).then( function(createdUser) {
        res.status(201).json({status: 'created', userId: createdUser.dataValues.id});  
    }, function(err) {
      res.status(400).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });   
  });

router.route('/:id')
  .get(function(req, res) {
    User.find(req.params.id).then(function(user) {
      if(!user) return res.sendStatus(404);
      res.status(200).json(user.dataValues);
    },function(err) {
      res.status(400).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

module.exports = router;
