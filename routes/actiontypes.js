var express = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();
var router = express.Router();
var ActionType = require('../models/index.js').ActionType;
var publishers = require('../routes/publishers.js');
var passport = require('passport');

var ActionTypeBuilder = function(req, res, next){
  var actionType = {
    actionName: req.body.actionName,
    actionWeight: req.body.actionWeight,
    publisherId: req.user.id
  }
  req.body.actionType = actionType;
  next();
}
router.route('/')
  .post(jsonParser, ActionTypeBuilder, function(req, res){
    if (req.isAuthenticated()){
    var actionType = req.body.actionType;
    ActionType.create(actionType).then(function(createdActionType) {
      res.status(201).json({status: 'created', actionTypeId: createdActionType.dataValues.id});
    }, function(err){
      res.status(404).json({status: 'ERROR', message: 'Something went wrong '+ err});
    });
  }
  else {
      res.redirect('/publishers/homepage');
    }
});

router.route('/:id')
  .get(function(req, res) {
    var id = req.params.id.substring(1);
    ActionType.find(id).then(function(actionType) {
      if(!actionType) return res.sendStatus(404);
      res.render('editAction',{
          title: 'Edit Action',
          actiontype: actionType
        });
    },function(err) {
      res.status(404).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });

router.route('/:id')
  .post(urlEncoded,function(req, res) {
    var id = req.params.id.substring(1);
    ActionType.find(id).then(function(oldActionType) {
      if(!oldActionType) return res.sendStatus(404);
      oldActionType.setDataValue('actionName', req.body.actionName);
      oldActionType.setDataValue('actionWeight', req.body.actionWeight);
      oldActionType.save();
      res.redirect('../publishers/profile');
    }, function(err) {
      res.status(400).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });
  });
  
router.route('/:id')
  .delete(function(req,res) {
    var id = req.params.id.substring(1);
    ActionType.find(id).then(function(toBeDeletedActionType) {
      if(!toBeDeletedActionType) return res.sendStatus(404);
      toBeDeletedActionType.destroy();
    res.status(200).json({status: 'deleted'});
    }, function(err) {
      res.status(400).json({status: 'ERROR', message: 'Something went wrong ' + err});
    });  
  });

  module.exports = router;