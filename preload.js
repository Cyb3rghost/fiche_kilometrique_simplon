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
