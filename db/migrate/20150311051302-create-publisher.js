"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Publishers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      domain: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      channel: {
        type: DataTypes.STRING
      },
      apikey: {
        type: DataTypes.STRING
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
    migration.dropTable("Publishers").done(done);
  }
};