"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable("Impression",{
    	id: {
    		allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    	},
        width: {
        	type : DataTypes.INTEGER
        },
        height: {
        	type : DataTypes.INTEGER
        },
        redirectUrl : {
        	type : DataTypes.STRING
        },
        createdAt: {
        allowNull: false,
        type: DataTypes.DATE
        },
        updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
        }
       }).done(done);
        
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("Impression").done(done);
  }
};
