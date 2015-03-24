var express = require('express');
var bodyParser = require('body-parser');
var urlEncoder = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();
var router = express.Router();
var UserAction = require('../models/index.js').UserAction;

var UserActionBuilder = function(req, res, next){
  var userAction = {
    userId = req.body.userId,
    publisherId = req.body.publisherId
  }
  req.body.userAction = userAction;
  next();
}

router.route('/')
  .post(urlEncoded, UserActionBuilder, function(req, res){
    var userAction = req.body.userAction;
    UserAction.create(userAction).then(function(createdUserAction){
      res.status(201).json{(status: 'created', userActionId: createdUserAction.dataValues.id)};
    }, function(err){
      res.status(404).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

  module.exports = router;