"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("ActionTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      action_name: {
        type: DataTypes.STRING
      },
      action_weight: {
        type: DataTypes.INTEGER
      },
      publisherId: {
        type: DataTypes.INTEGER,
        references: 'Publishers',
        referencesKey: 'id',
        allowNull: false
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
    migration.dropTable("ActionTypes").done(done);
  }
};