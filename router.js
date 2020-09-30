/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
var bodyParser = require('body-parser') 

const path = require('path');
 
/* Ajout de express-ejs-layouts */
const ejsLayout = require('express-ejs-layouts');

const Individus = require('./models/Individus');
const sequelize = require('./database');
 
/* Initialisation des variables */
const router = {
    isStarted: false
};
 
function start(callback) {
    if (router.isStarted === false) {
        init(function () {
            loadRoutes(function () {
                /* Lance le serveur web sur le port 3000 */
                http.listen(3000, function () {
                    console.log('Application is running on port 3000');
                    router.isStarted = true;
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                });
            });
        });
    } else {
        console.log("Application already started");
        if (typeof callback != 'undefined') {
            callback();
        }
    }
}
 
function init(callback) {
    /* On s'assure que le serveur n'est vraiment pas démarré */
    router.isStarted = false;
 
    /* Ajout de express-ejs-layouts */
    expressApp.use(ejsLayout);
 
    /* J'utilise ici EJS comme moteur de template */
    expressApp.set('view engine', 'ejs');

    // parse application/x-www-form-urlencoded
    expressApp.use(bodyParser.urlencoded({ extended: false }))
    
    // parse application/json
    expressApp.use(bodyParser.json())
 
    /* assets sera le répertoire où se trouverons nos fichiers côté client */
    expressApp.use(express.static(path.join(__dirname, 'assets')));
 
    /* views est défini comme notre dossier de vues par défaut */
    expressApp.set('views', path.join(__dirname, '/views/'));
 
    if (typeof callback != 'undefined') {
        callback();
    }
}
 
/* ROUTES */
 
function loadRoutes(callback) {
    expressApp.get('/', function (req, res) {
        /*sequelize
        //.sync({ force: true })
        .sync()
        .then(result => {
      
          Individus.findByPk(1).then(function (individu) {
              console.log(individu)
          });
      
        }).catch(err =>{
          console.log('an error occursed', err);
        });*/

        res.render('homepage/index', { layout: 'layout-base.ejs' });
    });

    expressApp.post('/connexion', function(req, res, next) {

        var username = req.body.username
        var password = req.body.password

        Individus.findAll({
            where: {
              username: username,
              password: password
            }
          }).then(function (result) {

            if(result.length === 0)
            {

                console.log('Connexion impossible.')

            }
            else
            {

                /*localStorage.setItem('id', result.id);
                localStorage.setItem('role', result.role);
                localStorage.setItem('username', result.username)
                console.log(result)
                console.log(localStorage.getItem('id'))

                location.href = '/dashboard'*/
                
                console.log(result)

                location.href = '/dashboard'

            }
        })
        .catch(function (error) {
                console.log(error)
        });

    });

    expressApp.get('/deconnexion', function (req, res) {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('role');

        localtion.href = '/';

    });

    expressApp.get('/inscription', function (req, res) {
        res.render('homepage/inscription', { layout: 'layout-base.ejs' });
    });

    expressApp.get('/dashboard', function (req, res) {
        res.render('homepage/dashboard', { layout: 'layout.ejs' });
    });

    expressApp.get('/gestion-des-entitees', function (req, res) {
        res.render('homepage/gestion-des-entitees', { layout: 'layout.ejs' });
    });

    expressApp.get('/association-individus', function (req, res) {
        res.render('homepage/association-individus', { layout: 'layout.ejs' });
    });

    expressApp.get('/association-vehicules', function (req, res) {
        res.render('homepage/association-vehicules', { layout: 'layout.ejs' });
    });

    expressApp.get('/nouvelle-entitee', function (req, res) {
        res.render('homepage/nouvelle-entitee', { layout: 'layout.ejs' });
    });

    expressApp.get('/gestion-individus', function (req, res) {
        res.render('homepage/gestion-individus', { layout: 'layout.ejs' });
    });

    expressApp.get('/nouvelle-individu', function (req, res) {
        res.render('homepage/nouvelle-individu', { layout: 'layout.ejs' });
    });

    expressApp.get('/gestion-vehicules', function (req, res) {
        res.render('homepage/gestion-vehicules', { layout: 'layout.ejs' });
    });

    expressApp.get('/nouveau-vehicule', function (req, res) {
        res.render('homepage/nouveau-vehicule', { layout: 'layout.ejs' });
    });

    expressApp.get('/suivis-indemnites', function (req, res) {
        res.render('homepage/suivis-indemnites', { layout: 'layout.ejs' });
    });

    expressApp.get('/fiches-kilometriques', function (req, res) {
        res.render('homepage/fiches-kilometriques', { layout: 'layout.ejs' });
    });

    expressApp.get('/voir-fiche-kilometrique', function (req, res) {
        res.render('homepage/voir-fiche-kilometrique', { layout: 'layout.ejs' });
    });
    
    

    
 
    if (typeof callback != 'undefined') {
        callback();
    }
}
 
module.exports = {
    start: start
};