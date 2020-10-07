const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Fiches = sequelize.define('fiches', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY
    } 
  }, { timestamps: true });

module.exports = Fiches;