const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Individus = sequelize.define('individus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT
    },
    nom: {
      type: DataTypes.TEXT
    },
    prenom: {
      type: DataTypes.TEXT
    },
    fonction: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  }, { timestamps: true });

module.exports = Individus;