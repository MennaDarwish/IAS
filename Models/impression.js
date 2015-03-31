"use strict" ; 
module.exports = function(sequelize, DataTypes) {
  var Impression = sequelize.define("Impression", {
    // impression attributes 
  }, {
    classMethods: {
      associate: function(models) {
        Impression.belongsTo(models.User, {foreignKey: 'userId'});
        Impression.belongsTo(model.Ad , {forgein: 'adId'});

      }
    }
  });
  return Impression;
};