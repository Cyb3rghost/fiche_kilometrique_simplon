const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const AssociationIndividus = sequelize.define('association_individus', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  }, { timestamps: true });

module.exports = AssociationIndividus;