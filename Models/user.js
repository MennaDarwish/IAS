"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.ENUM('male', 'female')
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Publisher, {foreignKey:'publisherId' });
        User.belongsToMany(models.Interest, {through: models.UserInterest, foreignKey: 'userId'});
        User.belongsTo(models.Impression , {forgeinKey:'impressionId'});
      }
    }
  });
  return User;
};
