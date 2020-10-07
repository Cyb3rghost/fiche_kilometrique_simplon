const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Trajet = sequelize.define('trajet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
      type: DataTypes.TEXT,
    },
    trajet: {
      type: DataTypes.TEXT
    },
    commentaire: {
      type: DataTypes.TEXT
    },
    depart: {
      type: DataTypes.INTEGER
    },
    arrivee: {
        type: DataTypes.INTEGER
    },
    distance: {
        type: DataTypes.INTEGER
    }
  }, { timestamps: true });

module.exports = Trajet;