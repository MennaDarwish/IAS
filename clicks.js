"use strict"
module.exports = function(sequelize, DataTypes) {
	var Click = sequelize.define("Click", {
		redirectUrl: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Click.belongsTo(models.Ad, {foreignKey: 'adId'});
				Click.belongsTo(models.User, {foreignKey: 'userId'});
			}
		}
	});
	return Click;
};