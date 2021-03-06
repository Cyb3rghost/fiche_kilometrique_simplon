const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Vehicules = sequelize.define('vehicules', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    marque: {
      type: DataTypes.TEXT,
    },
    modele: {
      type: DataTypes.TEXT
    },
    baremeId: {
      type: DataTypes.INTEGER
    },
    annee: {
      type: DataTypes.NUMBER
    },
    immatriculation: {
      type: DataTypes.TEXT
    }
  }, { timestamps: true });

module.exports = Vehicules;