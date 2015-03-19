"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("UserInterests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      weight: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        references: 'Users',
        referencesKey: 'id',
        allowNull: false
      },
      interestId: { 
        type: DataTypes.INTEGER,
        references: 'Interests',
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
    migration.dropTable("UserInterests").done(done);
  }
};
