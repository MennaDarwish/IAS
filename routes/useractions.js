var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
var UserAction = require('../models/index.js').UserAction;

var UserActionBuilder = function(req, res, next){
  var userAction = {
    userId: req.body.userId,
    actionTypeId: req.body.actionTypeId
  }
  req.body.userAction = userAction;
  next();
}

router.route('/')
  .post(jsonParser, UserActionBuilder, function(req, res){
    var userAction = req.body.userAction;
    UserAction.create(userAction).then(function(createdUserAction){
      res.status(201).json({status: 'created', userActionId: createdUserAction.dataValues.id});
    }, function(err){
      res.status(404).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

router.route('/:id')
  .get(function(req, res) {
    UserAction.find(req.params.id).then(function(userAction) {
      if(!userAction) return res.sendStatus(404);
      res.status(200).json(userAction.dataValues);
    },function(err) {
      res.status(400).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

router.route('/:id')
  .delete(function(req,res) {
    UserAction.find(req.params.id).then(function(toBeDeletedUserAction) {
      if(!toBeDeletedUserAction) return res.sendStatus(404);
      toBeDeletedUserAction.destroy();
      res.status(200).json({status: 'deleted'});
    }, function(err) {
      res.status(400).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
    
  });

  module.exports = router;