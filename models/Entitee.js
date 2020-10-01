const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../database');

const Entitee = sequelize.define('entitee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type_entitee: {
      type: DataTypes.TEXT,
    },
    nom_entitee: {
      type: DataTypes.TEXT
    }
  }, { timestamps: true });

module.exports = Entitee;