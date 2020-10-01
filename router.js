/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
var bodyParser = require('body-parser') 
var session = require('express-session')

const path = require('path');

/* DEFINITION DES MODELS */
const Individus = require('./models/Individus');
const Entitee = require('./models/Entitee');
const AssociationIndividus = require('./models/AssociationIndividus');

/* DEFINITION DES MODELS */

/* DEFINITION DES RELATIONS */

Entitee.belongsToMany(Individus, { through: AssociationIndividus });
Individus.belongsToMany(Entitee, { through: AssociationIndividus });

/* DEFINITION DES RELATIONS */

const sequelize = require('./database');
 
/* Initialisation des variables */
const router = {
    isStarted: false
};

expressApp.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600*1000*3
    }
}));
 
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
        res.render('homepage/index');
    });

    expressApp.post('/connexion', function(req, res, next) {

        var username = req.body.username
        var password = req.body.password

        Individus.findOne({
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

                req.session.userId = result.id
                req.session.username = result.username
                req.session.role = result.role
                console.log(req.session)

                res.redirect('/dashboard')

            }
        })
        .catch(function (error) {
                console.log(error)
        });

    });

    expressApp.get('/deconnexion', function (req, res) {

        req.session.destroy(function(err) {
            // cannot access session here

            console.log(req.session)

            res.redirect('/');

          })

    });

    expressApp.get('/inscription', function (req, res) {
        res.render('homepage/inscription');
    });

    expressApp.get('/dashboard', function (req, res, next) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/dashboard', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/gestion-des-entitees', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            Entitee.findAll().then(function (result) {

                console.log(result)
    
                res.render('homepage/gestion-des-entitees', { username: req.session.username, userId: req.session.userId, role: req.session.role, listeEntitee: result });

                //res.redirect('/gestion-des-entitees');
                
            })
            .catch(function (error) {
                    console.log(error)
            });

        }

    });

    expressApp.get('/nouvelle-entitee', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/nouvelle-entitee', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.post('/nouvelle-entitee', function(req, res) {

        var nomEntitee = req.body.nom_entitee
        var typeEntitee = req.body.type_entitee

        Entitee.create(
        { 
            type_entitee: typeEntitee, 
            nom_entitee: nomEntitee 

        }).then(function (result) {

            console.log(result)

            res.redirect('/gestion-des-entitees');
            
        })
        .catch(function (error) {
                console.log(error)
        });


    });

    expressApp.get('/association-individus/:id', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            idEntitee = req.params.id

            Entitee.findByPk(idEntitee).then(function (result) {

                Individus.findAll().then(function (resultDeux) {

                    AssociationIndividus.findAll({
                        include: {
                            model: Entitee,
                            model: Individus
                        },
                        entiteeId: idEntitee
                    }).then(function (resultTrois) {

                        console.log(resultTrois)

                        res.render('homepage/association-individus', { username: req.session.username, userId: req.session.userId, role: req.session.role, infoEntitee: result, listeIndividus: resultDeux, listeAssociationIndividus: resultTrois });
                            
                    })
                    .catch(function (error) {
                            console.log(error)
                    });
                        
                })
                .catch(function (error) {
                        console.log(error)
                });

                    
            })
            .catch(function (error) {
                    console.log(error)
            });


        }

    });

    expressApp.post('/association-individus', function(req, res) {

        var idEntitee = req.body.id_entitee
        var idIndividu = req.body.id_individu

        AssociationIndividus.findOne({
            entiteeId: idEntitee,
            individusId: idIndividu
        }).then(function (result) {
        
                if(result === null)
                {

                    AssociationIndividus.create(
                        { 
                            entiteeId: idEntitee, 
                            individusId: idIndividu 
                
                        }).then(function (resultDeux) {
                
                            console.log(resultDeux)
                
                            res.redirect('/association-individus/' + idEntitee);
                            
                        })
                        .catch(function (error) {
                                console.log(error)
                    });

                }
                else
                {

                    console.log('Cette association existe déjà.')

                }
                
            })
            .catch(function (error) {
                    console.log(error)
        });

    });

    expressApp.get('/association-vehicules', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/association-vehicules', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/gestion-individus', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/gestion-individus', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/nouvelle-individu', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/nouvelle-individu', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/gestion-vehicules', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/gestion-vehicules', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/nouveau-vehicule', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/nouveau-vehicule', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/suivis-indemnites', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/suivis-indemnites', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/fiches-kilometriques', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/fiches-kilometriques', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });

    expressApp.get('/voir-fiche-kilometrique', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            res.render('homepage/voir-fiche-kilometrique', { username: req.session.username, userId: req.session.userId, role: req.session.role });

        }

    });
    
 
    if (typeof callback != 'undefined') {
        callback();
    }
}
 
module.exports = {
    start: start
};