var Actiontypes = require('../models/index.js').ActionType;
var Publisher = require('../models/index.js').Publisher;
var Q = require('q');

exports.createAction = function (name,weight,publisherId){
  var action = {
  "actionName" : name,
	"actionWeight" : weight,
	"publisherId" : publisherId
	}
  Actiontypes.create(action)
    .then(function (createdAction) {
      console.log("Action: " + JSON.stringify(createdAction));
    });
}
