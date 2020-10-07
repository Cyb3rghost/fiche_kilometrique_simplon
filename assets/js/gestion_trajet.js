$(function() {

    const axios = require('axios');

    var tbl = $("#tableFiche");
    var totalTrajet = 1
    //var listeTrajet

    $('#total_trajet').val(totalTrajet)
    var totalKilometrage = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var chevauxFiscaux = $('#chevauxFiscaux').val();

    for (let index = 0; index < totalTrajet; index++) {
      
          $(`<tr>
            <th scope="row">
                <input type="date" data-id="1" id="date" name="date1" class="form-control" />
            </th>
            <td>
              <input type="text" data-id="1" class="form-control" id="trajet" name="trajet1" placeholder="Client,Projet,Réunion...">
            </td>
            <td>
              <input type="text" data-id="1" class="form-control" id="commentaire" name="commentaire1" placeholder="Commentaire...">
            </td>
            <td>
              <input type="number" data-id="1" class="form-control depart1" name="depart1"  min="0"  id="depart" />
            </td>
            <td>
              <input type="number" data-id="1" class="form-control arrivee1" name="arrivee1" min="0"  id="arrivee" />
            </td>
            <td>
              <input type="number" class="form-control distance1" min="0" name="distance1" id="distance1" readOnly />
            </td>
            <td>
              <span id="1" class='delRowBtn'>Delete</span>
            </td>
          </tr>`).appendTo(tbl);   
      
    }

    $('#nouveau_trajet').on('click', function() {

      var index = $('#total_trajet').val()
      var index = parseInt(index) + parseInt(1)

      $('#total_trajet').val(index)

      $(`<tr>
          <th scope="row">
              <input type="date" data-id="${index}" id="date" name="date${index}" class="form-control" />
          </th>
          <td>
            <input type="text" data-id="${index}" class="form-control" name="trajet${index}" id="trajet" placeholder="Client,Projet,Réunion...">
          </td>
          <td>
            <input type="text" data-id="${index}" class="form-control" name="commentaire${index}" id="commentaire" placeholder="Commentaire...">
          </td>
          <td>
            <input type="number" data-id="${index}" class="form-control depart${index}" name="depart${index}" min="0" id="depart" />
          </td>
          <td>
            <input type="number" data-id="${index}" class="form-control arrivee${index}" name="arrivee${index}" min="0"  id="arrivee" />
          </td>
          <td>
            <input type="number" class="form-control distance${index}" min="0" id="distance${index}" name="distance${index}" readOnly />
          </td>
          <td>
            <span id="${index}" class='delRowBtn'>Delete</span>
          </td>
        </tr>`).appendTo(tbl);        

    });

    $(document.body).delegate(".delRowBtn", "click", function(){

        var index = $('#total_trajet').val()
        var index = parseInt(index) - parseInt(1)

        //totalKilometrage = [];

        var indexLigne = $(this)[0].attributes[0].value
        var indexLigneADelete = $('#distance' + indexLigne).val()

        for( let i = 0; i < totalKilometrage.length; i++){ 
          console.log(totalKilometrage[i])
          if ( totalKilometrage[i] == indexLigneADelete) { 
            totalKilometrage.splice(i, 1); 
          }
        }

        $('#total_trajet').val(index)

        //console.log($(this)[0].attributes[0].value) Permet de récupérer l'ID aussi

        $(this).closest("tr").remove();  

        $('#total_kilometrage').html(totalKilometrage.reduce(reducer) + 'KM')
        $('#total_kilometrage_deux').html(totalKilometrage.reduce(reducer) + 'KM')

        var compensation
        var maxKilometrage = totalKilometrage.reduce(reducer)

        $('#dataTotalKilometrage').val(maxKilometrage)

        console.log(chevauxFiscaux)

        switch (chevauxFiscaux) {
          case '3 CV et moins':  
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.410

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.245) + 824

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.285

            }

            $('#total_compensation_deux').html(Math.round(compensation) + ' €')
            $('#total_compensation').html(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '4 CV':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.493

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.270) + 1082

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.332

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '5 CV':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.543

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.305) + 1188

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.364

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '6 CV':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.568

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.320) + 1244

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.382

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '7 CV et plus':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.595

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.337) + 1288

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.401

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          default:
            break;
        }

        
        //console.log(totalKilometrage.reduce(reducer) + 'KM !');

    });      

    $(document.body).delegate('#depart', 'change', function() {

      console.log($(this).attr("data-id"))
      console.log($(this).val())

      var kilometrageDepart = $('.depart' + $(this).attr("data-id")).val()
      var kilometrageArrivee = $('.arrivee' + $(this).attr("data-id")).val()

      if(kilometrageDepart.length != 0)
      {

        var distance = kilometrageArrivee - kilometrageDepart

        if(Math.sign(distance) == -1)
        {

          $('#distance' + $(this).attr("data-id")).val(0)

        }
        else
        {

          $('#distance' + $(this).attr("data-id")).val(distance)

        }


      }


    });

    

    $(document.body).delegate('#arrivee', 'change', function() {

      console.log($(this).attr("data-id"))
      console.log($(this).val())

      var kilometrageDepart = $('.depart' + $(this).attr("data-id")).val()
      var kilometrageArrivee = $('.arrivee' + $(this).attr("data-id")).val()
      var nombreDeLigne = $('#total_trajet').val()
      

      if(kilometrageDepart.length != 0)
      {

        var distance = kilometrageArrivee - kilometrageDepart
        if(Math.sign(distance) == -1)
        {

          $('#distance' + $(this).attr("data-id")).val(0)

        }
        else
        {

          $('#distance' + $(this).attr("data-id")).val(distance)
          totalKilometrage.push(parseInt($('#distance' + $(this).attr("data-id")).val()))

        }

        var compensation
        var maxKilometrage = totalKilometrage.reduce(reducer)
        $('#total_kilometrage').html(maxKilometrage + 'KM')
        $('#total_kilometrage_deux').html(maxKilometrage + 'KM')
        $('#dataTotalKilometrage').val(maxKilometrage)

        console.log(chevauxFiscaux)

        switch (chevauxFiscaux) {
          case '3 CV et moins':  
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.410

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.245) + 824

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.285

            }

            $('#total_compensation_deux').html(Math.round(compensation) + ' €')
            $('#total_compensation').html(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '4 CV':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.493

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.270) + 1082

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.332

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '5 CV':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.543

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.305) + 1188

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.364

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '6 CV':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.568

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.320) + 1244

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.382

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          case '7 CV et plus':
            if(maxKilometrage <= 5000 )
            {

                compensation = maxKilometrage * 0.595

            }
            else if (maxKilometrage > 5001 && maxKilometrage < 20000) 
            {
              
              compensation = (maxKilometrage * 0.337) + 1288

            } 
            else if (maxKilometrage > 20000) 
            {
              
              compensation = maxKilometrage * 0.401

            }

            $('#total_compensation_deux').val(Math.round(compensation) + ' €')
            $('#total_compensation').val(Math.round(compensation) + ' €')
            $('#dataCompensation').val(Math.round(compensation))
            break;
          default:
            break;
        }


      }


    });

    /*$('#choisir_entitee').on('change', function() {

    });*/
})