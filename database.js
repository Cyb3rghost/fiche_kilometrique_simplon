const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'FKSBDD.db'
});

module.exports =  sequelize;