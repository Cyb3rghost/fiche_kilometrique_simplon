// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  window.$ = window.jQuery = require('jquery')
  require( 'datatables.net-bs4' )( $ );
  const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'FKSBDD.db'
  });
  
  try {
      sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }

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
    },
    created_at: {
      type: Sequelize.STRING
    },
    updated_at: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  Individus.findByPk(1).then(function (individu) {
      console.log('TEST')
  });

  /*let Individus = sequelize.define('individus', {
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      nom: Sequelize.STRING,
      prenom: Sequelize.STRING,
      fonction: Sequelize.STRING,
      role: Sequelize.STRING,
  });

  let individu = Individus.findAll({ raw: true });
  console.log(individu);

  sequelize.close();*/

  /*Individus.findByPk(1).then((individus) => {
      console.log(individus.get({ plain: true }));
      console.log('********************')
      console.log(`id: ${individus.id}, username: ${individus.username}`);
  }).finally(() => {
      sequelize.close();
  });*/

  $('#menuInscription').attr("href", __dirname + '/inscription.html')
  $('#menuConnexion').attr("href", __dirname + '/index.html')
  $('#menuDashboard').attr("href", __dirname + '/dashboard.html')
  $('#menuEntitees').attr("href", __dirname + '/gestion-entitees.html')
  $('#menuRetour').attr("href", __dirname + '/dashboard.html')
  $('#menuNouvelleEntitee').attr("href", __dirname + '/nouvelle-entitee.html')
  $('#menuAssociationIndividus').attr("href", __dirname + '/association-individus.html')
  $('#menuAssociationVehicules').attr("href", __dirname + '/association-vehicules.html')
  $('#menuIndividus').attr("href", __dirname + '/gestion-individus.html')
  $('#menuNouvelleIndividus').attr("href", __dirname + '/nouvelle-individus.html')
  $('#menuVehicules').attr("href", __dirname + '/gestion-vehicules.html')
  $('#menuNouveauVehicule').attr("href", __dirname + '/nouveau-vehicule.html')
  $('#suivisIndemnite').attr("href", __dirname + '/suivis-indemnites.html')
  $('#ficheKilometrique').attr("href", __dirname + '/gestion-fiches-kilometriques.html')
  $('#menuVoirFiche').attr("href", __dirname + '/voir-fiches-kilometriques.html')

  $('#table').dataTable();

})
