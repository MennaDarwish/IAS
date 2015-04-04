"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable( "Click", {
    	id: {
    		allowNull: false,
    		autoIncrement: true,
    		primaryKey: true,
    		type: DataTypes.INTEGER
    	},
    	impressionId: {
    		type: DataTypes.INTEGER,
    		references: 'Impression',
    		referencesKey: 'id',
    		allowNull: false
    	}
    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("Click").done(done);
  }
};
