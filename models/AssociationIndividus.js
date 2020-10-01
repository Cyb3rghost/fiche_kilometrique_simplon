const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../database');

const AssociationIndividus = sequelize.define('association_individus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entiteeId: {
      type: DataTypes.INTEGER,
    },
    individuId: {
      type: DataTypes.INTEGER
    }
  }, { timestamps: true });

module.exports = AssociationIndividus;