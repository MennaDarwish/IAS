"use strict";
module.exports = function(sequelize, DataTypes) {
  var Publisher = sequelize.define("Publisher", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    domain: DataTypes.STRING,
    email: DataTypes.STRING,
    channel: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Publisher.hasMany(models.User, {foreignKey: 'publisherId'})
      }
    }
  });
  return Publisher;
};
