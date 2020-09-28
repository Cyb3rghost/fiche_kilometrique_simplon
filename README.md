A quoi sert electronJS ?

Electron c’est une librairie javascript (NodeJS) qui nous permettra de développer des applications multiplateforme (linux, windows, mac) en utilisant des technologies web html / css et javascript.

Dépendance nécessaire : 
NodeJS / GIT

Commande d’installation d’électron : 
npm install -g electron

Initialisation d’un projet electron : 

# Clonez le dépôt Quick Start
$ git clone https://github.com/electron/electron-quick-start

# Allez dans le dépôt
$ cd electron-quick-start

# Installez les dépendances et lancez l'app
$ npm install && npm start

Le console du développeur est accessible dans le menu   
View -> Toggle Developer Tools (correspond à F12 dans le navigateur).  

Notez que l'initialisation du projet se trouve dans le fichier main.js.

Avantages : 
On peut avoir des applications multiplateforme uniquement en développant avec des technologies web.

Inconvénients :
Selon ce qui se dit sur le web, il va embarquer un runtimeWeb complet dans chaque application ce qui va considérablement alourdir l’application et donc créer un gaspillage mémoire.
