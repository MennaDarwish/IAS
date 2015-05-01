var ActionType = require('../models/index.js').ActionType;
var Publisher = require('../models/index.js').Publisher;
var Q = require('q');

//Finding all the action types of a certain publisher to view them on their profile.
exports.viewActionTypes = function(publisherID) {
	var deferred = Q.defer();
	ActionType.findAll({where: {publisherId: publisherID} }).then(function(result) {
		deferred.resolve(result);
	});
	return deferred.promise;
};