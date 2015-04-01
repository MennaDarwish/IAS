"use strict" ; 
module.exports = function(sequelize, DataTypes) {
  var Impression = sequelize.define("Impression", {
        //width: DataTypes.INTEGER,
        //height: DataTypes.INTEGER,
        redirectUrl: DataTypes.STRING,
        //imageUrl: DataTypes.STRING,
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