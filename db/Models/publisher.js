"use strict";
module.exports = function(sequelize, DataTypes) {
  var Publisher = sequelize.define("Publisher", {
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    email: DataTypes.STRING,
    channel: DataTypes.STRING,
    apikey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Publisher.hasMany(models.User, {foreignKey: 'publisherId'});
        Publisher.hasMany(models.ActionType, {foreignKey: 'publisherId'});
      }
      
    }
  });
  return Publisher;
};
