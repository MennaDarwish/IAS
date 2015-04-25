"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("UserActions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      actionTypeId: {
        type: DataTypes.INTEGER,
        references: 'ActionType',
        referencesKey: 'id',
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: 'Users',
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
    migration.dropTable("UserActions").done(done);
  }
};