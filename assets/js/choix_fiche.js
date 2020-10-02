$(function() {

    const axios = require('axios');

    $('#choisir_entitee').on('change', function() {

        axios.get('/listeAssociationVehicule/' + this.value)
        .then(function (response) {
          // handle success
          var listeVehicule = response.data
          var nouvelleListe

          listeVehicule.forEach(element => {
              
            nouvelleListe += `<option value="${element.id}">${element.marque} - ${element.modele}</option>`

          });

          $('.affVehicule').show()

          $('#choisir_vehicule').html(nouvelleListe)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

    });
})