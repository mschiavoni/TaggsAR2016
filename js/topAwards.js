mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw';

$(function(){
 $('button.multiselect').each(function(i){
    $(this).addClass("dropDown" + i)
  $('.dropDown2').css("display", "none")
  })
console.log('done')
})

var map2;
var topLegend = document.getElementById('topLegend');
var topIntLegend = document.getElementById('topIntLegend');


$('#map2Drop').multiselect({
  maxHeight: 400,
  dropUp: true,
  includeSelectAllOption: true,
  selectAllText:'HHS (Select All)'
}).on("change", changeOpdivs)


function changeOpdivs() {
  var topOptions = $('.topMapOpt input:checked')
  var opdivsOn = [];
  for (var i= 0; i < topOptions.length; i++) {
    opdivsOn.push(topOptions[i].value);
  }

  map2.setFilter('us_recipients', ["in", 'org_acronym'].concat(opdivsOn))
    // return opdivsOn.indexOf(f.properties['org_acronym']) !== -1;
    return false;
  }


 
  $('#topIntLegend').css("display", "none")

  $('input[name="topAwards"]').click(function(){
    var selectedRecipientType = this.id


    if (selectedRecipientType === "topAwards"){

      createMapBoxTop()
      $('#topIntLegend').css("display", "none")
      $('#topLegend').css("display", "block")
      $('.dropDown2').css("display", "none")
      $('.dropDown1').css("display", "block")

    } else {

      createMapBoxTopInt()
      $('#topLegend').css("display", "none")
      $('#topIntLegend').css("display", "block")
      $('.dropDown1').css("display", "none" )
      $('.dropDown2').css("display", "block" )
    }
  });


  function createMapBoxTop(){


    map2 = new mapboxgl.Map({
      container: 'map2',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-98, 38.88],
      minZoom: 2,
      zoom: 3
    });






    map2.addControl(new mapboxgl.NavigationControl());

    map2.on('load', function () {
      map2.addSource('USRecip', {
        type: 'vector',
        url: 'mapbox://gcline001.ciynofkku00203upim49ilv7s-0m2mz'
      });

      map2.addLayer({
        'id': 'us_recipients',
        'source': 'USRecip',
        'source-layer': 'USRecipLatLong_R1',

        'type': 'circle',

        'circle-opacity': 0.8,
        'paint': {

          'circle-radius': {
            'base': 3,
            'stops': [[12, 10], [22, 100]]
          },

          'circle-color': {
            property: 'org_acronym',
            type: 'categorical',
            stops: [
            ['ACF', '#FF8000'],
            ['ACL', '#FFFF00'],
            ['AHRQ', '#80FF00'],
            ['ASPE', '#00CC00'],
            ['ASPR', '#DAF7A6'],
            ['CDC', '#0066CC'],
            ['CMS', '#0000CC'],
            ['FDA', '#7F00FF'],
            ['HRSA', '#B266FF'],
            ['IHS', '#990099'],
            ['NIH', '#CC0066'],
            ['OASH', '#808080'],
            ['OGA', '#663300'],
            ['ONC', '#666600'],
            ['SAMHSA', '#FF99FF']
            ]
          }
        }
      });
    });


    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map2.on('mousemove', function (e) {
      var features = map2.queryRenderedFeatures(e.point, { layers: ['us_recipients'] });

      map2.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
        popup.remove();
        return;
      }

      var feature = features[0];



      var value = feature.properties.total_award_amount;
      var num = '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");


      popup.setLngLat(feature.geometry.coordinates)
      .setHTML(
        "Recipient: "+ feature.properties.recip_name
        + "<br>"
        + "City: " + feature.properties.recip_city
        + "<br>"
        + "Agency: " + feature.properties.org_acronym
        + "<br>"
        + "Total Award Amount: " + num
        + "<br>"
        + "No. of Awards: " + feature.properties.total_number_awards
        + "<br>"
        + "Rank within Agency: " + feature.properties.total_award_amount_rank
        )
      .addTo(map2);
    });


  }


  createMapBoxTop()