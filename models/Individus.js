const { Sequelize } = require('sequelize');

var Individus = sequelize.define('individus', {
    username: {
      type: Sequelize.STRING,
      field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    password: {
      type: Sequelize.STRING
    },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    fonction: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = sequelize.define('individus', { Individus });