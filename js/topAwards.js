mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw';

var topLegend = document.getElementById('topLegend');
var topIntLegend = document.getElementById('topIntLegend');

      $('#topIntLegend').css("display", "none")

$('input[name="topAwards"]').click(function(){
  var selectedRecipientType = this.id


    if (selectedRecipientType === "topAwards"){

      createMapBoxTop()
    $('#topIntLegend').css("display", "none")
     $('#topLegend').css("display", "block")
    } else {

      createMapBoxTopInt()
     $('#topLegend').css("display", "none")
     $('#topIntLegend').css("display", "block")
    }
  });


function createMapBoxTop(){


  var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-98, 38.88],
    minZoom: 2,
    zoom: 3
  });
        // Add zoom and rotation controls to the map.
        map2.addControl(new mapboxgl.NavigationControl());
        //Map ID copied from MapBox Tileset goes here.
        map2.on('load', function () {
          map2.addSource('USRecip', {
            type: 'vector',
            url: 'mapbox://gcline001.ciynofkku00203upim49ilv7s-0m2mz'
          });
            // color is proportionally interpolated between two colors.
            map2.addLayer({
              'id': 'us_recipients',
              'source': 'USRecip',
              'source-layer': 'USRecipLatLong_R1',
                //'maxzoom': zoomThreshold,
                'type': 'circle',
                //'filter': ['==', 'class', 'country'],
                'circle-opacity': 0.8,
                'paint': {
                    // make circles larger as the user zooms from z12 to z22
                    'circle-radius': {
                      'base': 3,
                      'stops': [[12, 10], [22, 100]]
                    },
                    // color circles by agency, using data-driven styles
                    'circle-color': {
                      property: 'org_acronym',
                      type: 'categorical',
                      stops: [
                                ['ACF', '#1976D2'],
                                ['ACL', '#2196F3'],
                                ['AHRQ', '#64B5F6'],
                                ['ASPE', '#0288D1'],
                                ['ASPR', '#03A9F4'],
                                ['CDC', '#4FC3F7'],
                                ['CMS', '#0097A7'],
                                ['FDA', '#00BCD4'],
                                ['HRSA', '#4DD0E1'],
                                ['IHS', '#00897B'],
                                ['NIH', '#26A69A'],
                                ['OASH', '#81C784'],
                                ['OGA', '#9FA8DA'],
                                ['ONC', '#5C6BC0'],
                                ['SAMHSA', '#4CAF50']
                      ]
                    }
                  }
                });
          });

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map2.on('mousemove', function (e) {
          var features = map2.queryRenderedFeatures(e.point, { layers: ['us_recipients'] });
            // Change the cursor style as a UI indicator.
            map2.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

            if (!features.length) {
              popup.remove();
              return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.

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
