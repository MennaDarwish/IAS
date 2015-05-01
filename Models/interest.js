"use strict";
module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define("Interest", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Interest.belongsToMany(models.User, {through: models.UserInterest, foreignKey: 'interestId'});
      }
    }
  });
  return Interest;
};