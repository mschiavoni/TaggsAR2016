// 'use strict'
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw'

$('#mapDrop').multiselect();

  // set function to render graphs on change
  $('#mapDrop').on("change", function(){
    var selectedID = this.value.toLowerCase();
    createMapBox(selectedID)
  });


var COLORS = ['transparent', 'DEEPSKYBLUE', 'DodgerBlue', 'MediumSlateBlue', 'RoyalBlue', 'Blue', 'DarkBlue'];

var BREAKS_WORLD_hhs = [0, 1, 400000, 1300000, 4400000, 160000000, 4893101782];
var BREAKS_USA_hhs = [0, 1, 10000000, 35000000, 130000000, 1200000000, 58758910941];  
var BREAKS_WORLD = [0, 1, 400000, 1300000, 4400000, 160000000, 4893101782];
var BREAKS_USA = [0, 1, 10000000, 35000000, 130000000, 1200000000, 58758910941];

var currentAwards = "awarddollars_hhs";

function createMapBox(awarddollars_opdiv){
  $('input[name="awards"]').click(function(){
    var mapFile = this.value
    console.log('mapFile', mapFile)
    if (mapFile === 'mapbox://gcline001.ciz3dumig043b2wpxomrckf4e-4zm1e'){
      createMapBox(currentAwards)

    } else {

      createMapBox2(awarddollars_opdiv)

    }

  })

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-98, 38.88],
    minZoom: 2,
    zoom: 1
  });

  var zoomThreshold = 3;

  map.addControl(new mapboxgl.NavigationControl());

  map.on('load', function () {

    map.addSource('HHSWorld', {
      type: 'vector',
      url: 'mapbox://gcline001.ciz3dumig043b2wpxomrckf4e-4zm1e'
    });

    map.addLayer({
      'id': 'worldAward',
      'source': 'HHSWorld',
      'source-layer': 'WorldAndUSStates_All',
      'maxzoom': zoomThreshold,
      'type': 'fill',
      'filter': ['==', 'class', 'country'],
      'paint': {
        'fill-color': {
          property: awarddollars_opdiv,
          type: 'interval',
          stops: [
          [BREAKS_WORLD[0], COLORS[0]],
          [BREAKS_WORLD[1], COLORS[1]],
          [BREAKS_WORLD[2], COLORS[2]],
          [BREAKS_WORLD[3], COLORS[3]],
          [BREAKS_WORLD[4], COLORS[4]],
          [BREAKS_WORLD[5], COLORS[5]],
          [BREAKS_WORLD[6], COLORS[6]]
          ]

        },
        'fill-opacity': 1
      }
    }, 'place_label_country_small_s');

    map.addLayer({
      'id': 'USStateAward',
      'source': 'HHSWorld',
      'source-layer': 'WorldAndUSStates_All',
      'minzoom': zoomThreshold,
      'type': 'fill',
      'filter': ['==', 'class', 'state'],
                //'style':'style1'
                'paint': {
                  'fill-color': {
                    property: awarddollars_opdiv,
                    stops: [
                    [BREAKS_USA[0], COLORS[0]],
                    [BREAKS_USA[1], COLORS[1]],
                    [BREAKS_USA[2], COLORS[2]],
                    [BREAKS_USA[3], COLORS[3]],
                    [BREAKS_USA[4], COLORS[4]],
                    [BREAKS_USA[5], COLORS[5]],
                    [BREAKS_USA[6], COLORS[6]]
                    ]
                  },
                  'fill-opacity': 1
                }
              }, 'water');


    var popup1 = new mapboxgl.Popup({
      id: "popup-1",
      setStyle: {
        Position: "absolute",
        bottom: "85px",
        left: "50px",
        backgroundColor: "black",
        padding: "8px",
        border: "1px solid #ccc"
      },
      closeButton: false,
      closeOnClick: false
    });


    map.on('mousemove', function (e) {
      var zoom = map.getZoom();
      var zoomLayer;
      if (zoom <= zoomThreshold)
        { zoomLayer = 'worldAward'; }
      else
        { zoomLayer = 'USStateAward'; }

      features = map.queryRenderedFeatures(e.point, { layers: [zoomLayer] });

      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
        popup1.remove();
        return;
      }

      var feature = features[0];
console.log('ad', awarddollars_opdiv)

      var value = feature.properties.awarddollars_hhs;

      var num = '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      popup1
      .setLngLat(map.unproject(e.point))
      .setHTML(
        "Recipient: " + feature.properties.name
        + "<br>"
        + "Total Award Amount: " + num
        )
      .addTo(map);
    });

// **update legend
    var worldLegend = document.getElementById('worldLegend');
    var stateLegend = document.getElementById('stateLegend');
    stateLegend.style.display = 'none';
    map.on('zoom', function() {
      if (map.getZoom() > 3) {
        worldLegend.style.display = 'none';
        stateLegend.style.display = 'block';
      } else {
        worldLegend.style.display = 'block';
        stateLegend.style.display = 'none';
      }
    });

  })
}

createMapBox(currentAwards)


