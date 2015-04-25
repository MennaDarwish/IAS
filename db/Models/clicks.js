"use strict";
module.exports = function(sequelize, DataTypes) {
	var Click = sequelize.define("Click", {}, {
		classMethods: {
			associate: function(models) {
				Click.belongsTo(models.Impression, {
					foreignKey: 'impressionId'
				});
			}
		}
	});
	return Click;
};