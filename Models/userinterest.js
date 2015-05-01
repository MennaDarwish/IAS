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