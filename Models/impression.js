"use strict" ; 
module.exports = function(sequelize, DataTypes) {
  var Impression = sequelize.define("Impression", {
        
        adId: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        height: DataTypes.INTEGER,
        redirectUrl: DataTypes.STRING,
        //imageUrl: DataTypes.STRING,
   }, {
    classMethods: {
      associate: function(models) {
        Impression.belongsTo(models.User, {foreignKey: 'userId'});
        Impression.belongsTo(models.Publisher , {forgeinKey: 'publisherId'}); //check
      //Impression.belongsTo(model.Ad , {forgein: 'adId'});
      }
    }
  });
  return Impression;
};