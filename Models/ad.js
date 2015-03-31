"use strict" ; 
module.exports = function(sequelize, DataTypes) {
  var Ad = sequelize.define("Ad", {
    //height: DataTypes.INTEGER,
    //width: DataTypes.INTEGER,
    //imageUrl: DataTypes.STRING,
     redirectUrl: DataTypes.STRING
    //microUSD: DataTypes.INTEGER
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Ad.belongsTo(models.Publisher, {foreignKey: 'publisherId'});
        Ad.belongsTo(models.User, {foreignKey: 'UserId'});
      }
    }
  });
  return Ad;
};