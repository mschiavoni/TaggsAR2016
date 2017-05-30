// 'use strict'
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw'


// var COLORS = ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5'];
 // var COLORSORG = ['#f7fcf0', '#ccebc5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'];
 // var COLORSSTATE = ['#f7fcf0', '#ccebc5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'];
 // var COLORS = ['#f7fbff', '#b2dfdb', '#80cbc4', '#00838f', '#1976d2', '#1565c0', '#0d47a1'];
// var COLORSWORLD = ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5'];
// var COLORSTATE = ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5'];

function createMapBox2(awarddollars_opdiv, BREAKS_WORLD, BREAKS_USA){
console.log('crate mapbox2')
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-98, 38.88],
    minZoom: 1,
    zoom: 1
  });

  var zoomThreshold = 6;

  map.addControl(new mapboxgl.NavigationControl());


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
      url: 'mapbox://gcline001.ciz3dx5yp04no2wo41us21wdl-4zq5h'
    });



    map.addLayer({
      'id': 'worldAward',
      'source': 'HHSWorld',
      'source-layer': 'WorldAndUSStates_Discretionary',
      'maxzoom': zoomThreshold,
      'type': 'fill',
      'filter': ['==', 'class', 'country'],
      'paint': {
        'fill-color': {
          property: awarddollars_opdiv,
          type: 'interval',
          stops: [
          [BREAKS_WORLD[0], COLORSWORLD[0]],
          [BREAKS_WORLD[1], COLORSWORLD[1]],
          [BREAKS_WORLD[2], COLORSWORLD[2]],
          [BREAKS_WORLD[3], COLORSWORLD[3]],
          [BREAKS_WORLD[4], COLORSWORLD[4]],
          [BREAKS_WORLD[5], COLORSWORLD[5]],
          [BREAKS_WORLD[6], COLORSWORLD[6]]
          ]

        },
        'fill-opacity': 1
      }
    }, 'place_label_country_small_s');


    map.addLayer({
      'id': 'USStateAward',
      'source': 'HHSWorld',
      'source-layer': 'WorldAndUSStates_Discretionary',
      'minzoom': zoomThreshold,
      'type': 'fill',
      'filter': ['==', 'class', 'state'],

      'paint': {
        'fill-color': {
          property: awarddollars_opdiv,
          stops: [
          [BREAKS_USA[0], COLORSSTATE[0]],
          [BREAKS_USA[1], COLORSSTATE[1]],
          [BREAKS_USA[2], COLORSSTATE[2]],
          [BREAKS_USA[3], COLORSSTATE[3]],
          [BREAKS_USA[4], COLORSSTATE[4]],
          [BREAKS_USA[5], COLORSSTATE[5]],
          [BREAKS_USA[6], COLORSSTATE[6]]
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
      var value = feature.properties[awarddollars_opdiv];
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




     var worldLegend = document.getElementById('worldLegend');
  var stateLegend = document.getElementById('stateLegend');
  var stateButton =  $('#mapLinkState');
  var worldButton =  $('#mapLinkWorld');
  var stateExcel =  $('#mapExcelLinkState');
  var worldExcel =  $('#mapExcelLinkWorld');

  stateLegend.style.display = 'none';
  $(stateButton).css("display", "none");
  $(stateExcel).css("display", "none");
  $(worldButton).css("display", "block");
  $(worldExcel).css("display", "block");
  map.on('zoom', function() {
    if (map.getZoom() >= 3) {
     $(stateButton).css("display", "block");
     $(worldButton).css("display", "none");
     $(stateExcel).css("display", "block");
     $(worldExcel).css("display", "none");
     worldLegend.style.display = 'none';
     stateLegend.style.display = 'block'; 
    
   } else {
    $(stateButton).css("display", "none");
    $(worldButton).css("display", "block"); 
    $(stateExcel).css("display", "none");
    $(worldExcel).css("display", "block");
    worldLegend.style.display = 'block';
    stateLegend.style.display = 'none';
  }
});

  })
}



