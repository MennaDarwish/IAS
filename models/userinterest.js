"use strict";
module.exports = function(sequelize, DataTypes) {
  var UserInterest = sequelize.define("UserInterest", {
    weight: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {


      }
    }
  });
  return UserInterest;
};

var fetchUserInterests = function (userID) {
	UserInterest.findAll({ where: { userId: 'userID' } }).then(function(interests) {
  return interests;
})
}

exports.fetchInterests = fetchInterests;
