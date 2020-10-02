const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../database');

const AssociationVehicules = sequelize.define('association_vehicules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  }, { timestamps: true });

module.exports = AssociationVehicules;