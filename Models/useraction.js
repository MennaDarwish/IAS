"use strict";
module.exports = function(sequelize, DataTypes) {
  var UserAction = sequelize.define("UserAction",{}, {  
    classMethods: {
      associate: function(models) {
        // associations can be defined here.
        UserAction.belongsTo(models.ActionType, {foreignKey:'actionTypeId' });
        UserAction.belongsTo(models.User, {foreignKey:'userId' });
      }
    }
  });
  return UserAction;
};
