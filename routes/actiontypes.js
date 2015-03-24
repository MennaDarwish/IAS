var express = require('express');
var bodyParser = require('body-parser');
var urlEncoder = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();
var router = express.Router();
var ActionType = require('../models/index.js').ActionType;

var ActionTypeBuilder = function(req, res, next){
	var actionType = {
		action_name: req.body.action_name,
		action_weight: req.body.action_weight,
		publisherId: req.body.publisherId
	}
	req.body.actionType = actionType;
	next();
}
router.route('/')
  .post(urlEncoded, ActionTypeBuilder, function(req, res){
  	var actionType = req.body.actionType;
  	ActionType.create(actionType).then(function(createdActionType){
  		res.status(201).json({status: 'created', actionTypeId: createdActionType.dataValues.id});
  	}, function(err){
  		res.status(404).json({status: 'ERROR', message: 'Something went wrong '+ err});
  	});
  });

  module.exports = router;

  