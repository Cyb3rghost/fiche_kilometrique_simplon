/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
var bodyParser = require('body-parser') 
var session = require('express-session')
const axios = require('axios');

const path = require('path');

/* DEFINITION DES MODELS */
const Individus = require('./models/Individus');
const Entitee = require('./models/Entitee');
const AssociationIndividus = require('./models/AssociationIndividus');
const Vehicules = require('./models/Vehicule');
const AssociationVehicules = require('./models/AssociationVehicules');
const Fiches = require('./models/Fiches');

/* DEFINITION DES MODELS */

/* DEFINITION DES RELATIONS */

// Entitee.hasMany(AssociationIndividus, {
//     foreignKey: 'entiteeId'
// });
// AssociationIndividus.belongsTo(Entitee);
// Individus.hasMany(AssociationIndividus, {
//     foreignKey: 'individuId'
// });
// AssociationIndividus.belongsTo(Individus)



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

                Entitee.belongsToMany(Individus, { through: AssociationIndividus });
                Individus.belongsToMany(Entitee, { through: AssociationIndividus });

                Entitee.belongsToMany(Vehicules, { through: AssociationVehicules });
                Vehicules.belongsToMany(Entitee, { through: AssociationVehicules });

                Individus.belongsToMany(Entitee, { through: Fiches });
                Entitee.belongsToMany(Vehicules, { through: Fiches });
                Vehicules.belongsToMany(Entitee, { through: Fiches });

                sequelize
                    .sync()
                    .then(result => {
                        /* Lance le serveur web sur le port 3000 */
                        http.listen(3000, function () {
                            console.log('Application is running on port 3000');
                            router.isStarted = true;
                            if (typeof callback != 'undefined') {
                                callback();
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            
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
            var entiteInfo;

            Entitee.findByPk(idEntitee).then(function (result) { 
                entiteInfo = result;
                return Individus.findAll();
            }).then(allIndividus => {
                entiteInfo.getIndividus().then(individusRelation => {
                    res.render('homepage/association-individus', {
                        username: req.session.username,
                        userId: req.session.userId,
                        role: req.session.role,
                        infoEntitee: entiteInfo,
                        listeIndividus: allIndividus,
                        listeAssociationIndividus: individusRelation
                    });
                })
            }).catch(error => {
                console.log(error)
            })
        }

    });

    expressApp.post('/association-individus', function(req, res) {

        var idEntitee = req.body.id_entitee
        var idIndividu = req.body.id_individu

        AssociationIndividus.findOne({
            where: {
                entiteeId: idEntitee,
                individuId: idIndividu
            }
        }).then(function(result) {
                if(result === null)
                {

                    AssociationIndividus.create(
                        { 
                            entiteeId: idEntitee, 
                            individuId: idIndividu 
                
                        }).then(function (resultDeux) {
                
                            console.log(resultDeux)
                
                            return res.redirect('/association-individus/' + idEntitee);
                            
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

    expressApp.get('/association-vehicules/:id', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            idEntitee = req.params.id
            var entiteInfo;

            Entitee.findByPk(idEntitee).then(function (result) { 
                entiteInfo = result;
                return Vehicules.findAll();

            }).then(allVehicules => {

                entiteInfo.getVehicules().then(vehiculesRelation => {
                    res.render('homepage/association-vehicules', { 
                        username: req.session.username, 
                        userId: req.session.userId, 
                        role: req.session.role, 
                        entiteInfo: entiteInfo, 
                        listeVehicules: allVehicules,
                        listeAssociationVehicules: vehiculesRelation
                    });

                })


            }).catch(error => {
                console.log(error)
            })


        }

    });

    expressApp.post('/association-vehicule', function(req, res) {

        var idEntitee = req.body.id_entitee
        var idVehicule = req.body.id_vehicule

        AssociationVehicules.findOne({
            where: {
                entiteeId: idEntitee,
                vehiculeId: idVehicule
            }
        }).then(function(result) {
                if(result === null)
                {

                    AssociationVehicules.create(
                        { 
                            entiteeId: idEntitee, 
                            vehiculeId: idVehicule 
                
                        }).then(function (resultDeux) {
                
                            console.log(resultDeux)
                
                            return res.redirect('/association-vehicules/' + idEntitee);
                            
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

    expressApp.get('/gestion-individus', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            Individus.findAll().then(function (result) {

                console.log(result)
    
                res.render('homepage/gestion-individus', { username: req.session.username, userId: req.session.userId, role: req.session.role, listeIndividus: result });
                
            })
            .catch(function (error) {
                    console.log(error)
            });


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

    expressApp.post('/nouvelle-individu', function(req, res){

        var nom = req.body.nom
        var prenom = req.body.prenom
        var fonction = req.body.fonction

        Individus.create(
        { 
                username: nom, 
                password: 'test',
                nom: nom,
                prenom: prenom,
                fonction: fonction,
                role: 'user' 
    
            }).then(function (resultDeux) {
    
                console.log(resultDeux)
    
                return res.redirect('/gestion-individus');
                
            })
            .catch(function (error) {
                    console.log(error)
        });


    });

    expressApp.get('/gestion-vehicules', function (req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            Vehicules.findAll().then(function (result) {

                console.log(result)
    
                res.render('homepage/gestion-vehicules', { username: req.session.username, userId: req.session.userId, role: req.session.role, listeVehicules: result });

                
            })
            .catch(function (error) {
                    console.log(error)
            });


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

    expressApp.post('/nouveau-vehicule', function(req, res) {

        var marque = req.body.marque
        var modele = req.body.modele
        var puissance = req.body.puissance
        var annee = req.body.annee
        var immatriculation = req.body.immatriculation

        Vehicules.create(
            { 
                marque: marque,
                modele: modele,
                puissance: puissance,
                annee: annee,
                immatriculation: immatriculation
    
            }).then(function (result) {
    
                console.log(result)
    
                res.redirect('/gestion-vehicules');
                
            })
            .catch(function (error) {
                    console.log(error)
            });


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

            var entiteInfo;

            Fiches.findAll().then(function (result) { 
                ficheInfo = result;
                return Vehicules.findAll();

            }).then(allVehicules => {

                ficheInfo.getVehicules().then(vehiculesRelation => {

                    infosVehicule = vehiculesRelation

                    console.log(ficheInfo)
                    console.log(infosVehicule)

                    res.render('homepage/fiches-kilometriques', { 
                        username: req.session.username, 
                        userId: req.session.userId, 
                        role: req.session.role,
                        infosFiche: ficheInfo,
                        listeAssociationVehicules: infosVehicule
                    });

                })

                /*ficheInfo.getVehicules().then(vehiculesRelation => {

                    infosVehicule = vehiculesRelation

                    return Individus.findAll()

                }).getIndividus().then(individusRelation => {

                    infosIndividus = individusRelation

                    return Entitee.findAll()

                }).getEntitee().then(entiteeRelation => {

                    infosEntitee = entiteeRelation

                    console.log(infosVehicule)
                    console.log(infosIndividus)
                    console.log(infosEntitee)

                    res.render('homepage/fiches-kilometriques', { 
                        username: req.session.username, 
                        userId: req.session.userId, 
                        role: req.session.role,
                        listeAssociationVehicules: infosVehicule,
                        listeAssociationIndividus: infosIndividus,
                        listeAssociationEntitee: infosEntitee
                    });

                })*/

            }).catch(error => {
                console.log(error)
            })
        }

    });

    expressApp.get('/nouvelle-fiche', function(req, res) {

        if(req.session.userId == undefined)
        {

            res.redirect('/');

        }
        else
        {

            Entitee.findAll().then(function (result) {

                console.log(result)

                var nouvelleDate = new Date();
                var dateDuJour = nouvelleDate.getFullYear() + '-' + (nouvelleDate.getMonth() + 1) + '-' + '0' + nouvelleDate.getDate() 

                res.render('homepage/nouvelle-fiche', { username: req.session.username, userId: req.session.userId, role: req.session.role, listeEntitee: result, date: dateDuJour });
    
                //res.redirect('/gestion-des-entitees');
                
            })
            .catch(function (error) {
                    console.log(error)
            });


        }  

    });

    expressApp.get('/listeAssociationVehicule/:id', function(req, res) {

        var idEntitee = req.params.id

        Entitee.findByPk(idEntitee).then(function (result) { 
            entiteInfo = result;
            return Vehicules.findAll();

        }).then(allVehicules => {

            entiteInfo.getVehicules().then(vehiculesRelation => {
                
                console.log(vehiculesRelation)
                res.json(vehiculesRelation)

            })


        }).catch(error => {
            console.log(error)
        })

    });

    expressApp.post('/nouvelle-fiche', function(req, res) {

        var idUtilisateur = req.body.userId
        var dateActuel = req.body.date
        var idEntitee = req.body.choisir_entitee
        var idVehicule = req.body.choisir_vehicule

        Fiches.create(
        { 
            individuId: idUtilisateur,
            date: dateActuel,
            entiteeId: idEntitee,
            vehiculeId: idVehicule

        }).then(function (result) {

            console.log(result)

            res.redirect('/fiches-kilometriques');
            
        })
        .catch(function (error) {
                console.log(error)
        });


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