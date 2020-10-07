const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Baremes = sequelize.define('baremes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    chevauxFiscaux: {
      type: DataTypes.TEXT,
    },
    baremeUn: {
      type: DataTypes.TEXT
    },
    baremeDeux: {
      type: DataTypes.TEXT
    },
    baremeTrois: {
      type: DataTypes.TEXT
    }
  }, { timestamps: true });

module.exports = Baremes;