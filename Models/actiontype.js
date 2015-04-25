"use strict";
module.exports = function(sequelize, DataTypes) {
  var ActionType = sequelize.define("ActionType", {
    actionName: DataTypes.STRING,
    actionWeight: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ActionType.belongsTo(models.Publisher, {foreignKey:"publisherId" });
      }
    }
  });
  return ActionType;
};