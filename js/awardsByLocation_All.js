 // 'use strict'
 mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw'

 var COLORS = ['#f7fcf0', '#ccebc5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'];

 var allBreaks = {}

 allBreaks.BREAKS_ALL_ACF_USA = [0, 154731510, 328023652, 512039832, 794767868, 1237205349, 8535511793];
 allBreaks.BREAKS_ALL_ACF_WORLD = [0, , , , , , 50813864242];
 allBreaks.BREAKS_ALL_ACL_USA = [0, 11770440, 16780024, 25233124, 34680161, 49335971, 171775832];
 allBreaks.BREAKS_ALL_ACL_WORLD = [0, , , , , , 1852709195];
 allBreaks.BREAKS_ALL_AHRQ_USA = [0, 185296, 1320116, 2786897, 5420765, 9013499, 19379574];
 allBreaks.BREAKS_ALL_AHRQ_WORLD = [0, , , , , , 199178572];
 allBreaks.BREAKS_ALL_ASPE_USA = [0, , , , , , 1900000];
 allBreaks.BREAKS_ALL_ASPE_WORLD = [0, , , , , , 1900000];
 allBreaks.BREAKS_ALL_ASPR_USA = [0, 100000, 238895, 250000, 600000, 4465972, 30250000];
 allBreaks.BREAKS_ALL_ASPR_WORLD = [0, , , , , 119990, 51983576];
 allBreaks.BREAKS_ALL_CDC_USA = [0, 21029295, 32918663, 46731963, 69463052, 143136726, 769365831];
 allBreaks.BREAKS_ALL_CDC_WORLD = [0, 150000, 399920, 1226450, 2901414, 10128167, 4893101782];
 allBreaks.BREAKS_ALL_CMS_USA = [0, 1194536144, 2154265530, 3906762550, 6539978419, 10085047982, 58758910941];
 allBreaks.BREAKS_ALL_CMS_WORLD = [0, , , , , , 362757036925];
 allBreaks.BREAKS_ALL_FDA_USA = [0, 589494, 1680131, 2257042, 3453734, 5203007, 14870590];
 allBreaks.BREAKS_ALL_FDA_WORLD = [0, , 200000, 450000, 500000, 3990670, 175856137];
 allBreaks.BREAKS_ALL_HHS_USA = [0, 1493418035, 2468975897, 5047123899, 7777014227, 11966486466, 73211506394];
 allBreaks.BREAKS_ALL_HHS_WORLD = [0, 243350, 440000, 1256690, 3012984, 11462842, 458904101280];
 allBreaks.BREAKS_ALL_HRSA_USA = [0, 45322985, 75863655, 104037892, 147377857, 230248844, 1090010383];
 allBreaks.BREAKS_ALL_HRSA_WORLD = [0, , , , , 17194, 8664255780];
 allBreaks.BREAKS_ALL_IHS_USA = [0, 1421926, 4092232, 15137451, 33968504, 59440302, 689888719];
 allBreaks.BREAKS_ALL_IHS_WORLD = [0, , , , , , 2456726728];
 allBreaks.BREAKS_ALL_NIH_USA = [0, 31695282, 90298397, 161231663, 401349695, 694553330, 3635411028];
 allBreaks.BREAKS_ALL_NIH_WORLD = [0, 276309, 505618, 1052932, 1984300, 4143730, 23311714802];
 allBreaks.BREAKS_ALL_OASH_USA = [0, 2210829, 3419020, 5656036, 8408442, 11417291, 36406296];
 allBreaks.BREAKS_ALL_OASH_WORLD = [0, , , , , 100353, 402736044];
 allBreaks.BREAKS_ALL_OGA_USA = [0, , , 273000, 300000, 325000, 402000];
 allBreaks.BREAKS_ALL_OGA_WORLD = [0, , , , , , 1300000];
 allBreaks.BREAKS_ALL_ONC_USA = [0, -1662906, -79742, -53480, 100000, 315943, 404110];
 allBreaks.BREAKS_ALL_ONC_WORLD = [0, , , , , , -2961087];
 allBreaks.BREAKS_ALL_SAMHSA_USA = [0, 19202366, 28000050, 42897114, 58704153, 87893970, 410778224];
 allBreaks.BREAKS_ALL_SAMHSA_WORLD = [0, , , , , 249796, 3324698584];
 allBreaks.BREAKS_DISC_ACF_USA = [0, 32497568, 66841844, 133970776, 174146519, 239018797, 1278972027];
 allBreaks.BREAKS_DISC_ACF_WORLD = [0, , , , , , 10187505167];
 allBreaks.BREAKS_DISC_ACL_USA = [0, 1751929, 2441675, 3327758, 5185449, 8792809, 28416874];
 allBreaks.BREAKS_DISC_ACL_WORLD = [0, , , , , , 290394661];
 allBreaks.BREAKS_DISC_AHRQ_USA = [0, 185296, 1320116, 2786897, 5420765, 9013499, 19379574];
 allBreaks.BREAKS_DISC_AHRQ_WORLD = [0, , , , , , 199178572];
 allBreaks.BREAKS_DISC_ASPE_USA = [0, , , , , , 1900000];
 allBreaks.BREAKS_DISC_ASPE_WORLD = [0, , , , , , 1900000];
 allBreaks.BREAKS_DISC_ASPR_USA = [0, 100000, 238895, 250000, 600000, 4465972, 30250000];
 allBreaks.BREAKS_DISC_ASPR_WORLD = [0, , , , , 119990, 51983576];
 allBreaks.BREAKS_DISC_CDC_USA = [0, 20453237, 31567851, 44655939, 67543866, 138925839, 758712790];
 allBreaks.BREAKS_DISC_CDC_WORLD = [0, 150000, 399920, 1226450, 2901414, 10128167, 4750243222];
 allBreaks.BREAKS_DISC_CMS_USA = [0, 2511481, 9648699, 18861791, 34972312, 57284729, 188843339];
 allBreaks.BREAKS_DISC_CMS_WORLD = [0, , , , , , 1663575050];
 allBreaks.BREAKS_DISC_FDA_USA = [0, 589494, 1680131, 2257042, 3453734, 5203007, 14870590];
 allBreaks.BREAKS_DISC_FDA_WORLD = [0, , 200000, 450000, 500000, 3990670, 175856137];
 allBreaks.BREAKS_DISC_HHS_USA = [0, 152707004, 272770968, 517522214, 799740781, 1603440510, 6661749711];
 allBreaks.BREAKS_DISC_HHS_WORLD = [0, 243350, 440000, 1256690, 3012984, 11462842, 50382645109];
 allBreaks.BREAKS_DISC_HRSA_USA = [0, 43248221, 69367928, 99414335, 136117129, 221081224, 1050969992];
 allBreaks.BREAKS_DISC_HRSA_WORLD = [0, , , , , 17194, 8145827236];
 allBreaks.BREAKS_DISC_IHS_USA = [0, 213539, 875903, 1457278, 5312947, 9907105, 40886549];
 allBreaks.BREAKS_DISC_IHS_WORLD = [0, , , , , , 203538100];
 allBreaks.BREAKS_DISC_NIH_USA = [0, 31695282, 90298397, 161231663, 401349695, 694553330, 3635411028];
 allBreaks.BREAKS_DISC_NIH_WORLD = [0, 276309, 505618, 1052932, 1984300, 4143730, 23311714802];
 allBreaks.BREAKS_DISC_OASH_USA = [0, 2210829, 3419020, 5656036, 8408442, 11417291, 36406296];
 allBreaks.BREAKS_DISC_OASH_WORLD = [0, , , , , 100353, 402736044];
 allBreaks.BREAKS_DISC_OGA_USA = [0, , , 273000, 300000, 325000, 402000];
 allBreaks.BREAKS_DISC_OGA_WORLD = [0, , , , , , 1300000];
 allBreaks.BREAKS_DISC_ONC_USA = [0, -1662906, -79742, -53480, 100000, 315943, 404110];
 allBreaks.BREAKS_DISC_ONC_WORLD = [0, , , , , , -2961087];
 allBreaks.BREAKS_DISC_SAMHSA_USA = [0, 7995653, 11386834, 15733837, 20478945, 26423435, 75231849];
 allBreaks.BREAKS_DISC_SAMHSA_WORLD = [0, , , , , 249796, 999853629];


 for (var key in allBreaks) {
   var breaks = allBreaks[key];
   for (var i = 0; i < breaks.length; i++) {
     var num = breaks[i];
     if (!num){
       breaks[i] = 0
     }
   }
   allBreaks[key] = breaks;
 }

// ***** Legend scales

$('#mapDrop').multiselect({
  maxHeight: 400,
  dropUp: true
});

function updateLegend(arrState, arrWorld) {

  $(".stateLegendText").each(function(i){
    $(this).text(arrState[i].toReducedFormat())
  })

  $(".worldLegendText").each(function(i){
    $(this).text(arrWorld[i].toReducedFormat())
  })
}

$('#mapDrop').on("change", function(){

  var selectedAwardType = $('input[name="awards"]:checked').attr("id")
  var selectedOpdiv = this.value.toLowerCase();
  var selectedKey = selectedOpdiv.split("_")[1]
  getLegend(selectedKey,selectedAwardType)
  getLink(selectedKey, selectedAwardType)
  if (selectedAwardType === "totalAwards"){
    var stateBreaks = allBreaks["BREAKS_ALL_" + selectedKey.toUpperCase() + "_USA"]
    var worldBreaks = allBreaks["BREAKS_ALL_" + selectedKey.toUpperCase() + "_WORLD"]
    createMapBox(selectedOpdiv, worldBreaks, stateBreaks)


  } else {
    var stateBreaks = allBreaks["BREAKS_DISC_" + selectedKey.toUpperCase() + "_USA"]
    var worldBreaks = allBreaks["BREAKS_DISC_" + selectedKey.toUpperCase() + "_WORLD"]
    createMapBox2(selectedOpdiv, worldBreaks, stateBreaks)

  }
});


$('input[name="awards"]').click(function(){
  var selectedAwardType = this.id
  var selectedOpdiv = $('.radioOpt:checked').val().toLowerCase()
  var selectedKey = selectedOpdiv.split("_")[1]

  getLegend(selectedKey,selectedAwardType)
  getLink(selectedKey, selectedAwardType)

  if (selectedAwardType === "totalAwards"){
    var stateBreaks = allBreaks["BREAKS_ALL_" + selectedKey.toUpperCase() + "_USA"]
    var worldBreaks = allBreaks["BREAKS_ALL_" + selectedKey.toUpperCase() + "_WORLD"]
    createMapBox(selectedOpdiv, worldBreaks, stateBreaks)
  } else {
    var stateBreaks = allBreaks["BREAKS_DISC_" + selectedKey.toUpperCase() + "_USA"]
    var worldBreaks = allBreaks["BREAKS_DISC_" + selectedKey.toUpperCase() + "_WORLD"]
    createMapBox2(selectedOpdiv, worldBreaks, stateBreaks)
  }
});

function getLink(opdiv, type){
 var linkState = "USA_";
 var linkWorld = "World_";
 
 if (type === "totalAwards") {
  linkState += "All/USA_All_"
  linkWorld += "All/World_All_"

} else {
  linkState += "Discretionary/USA_Discretionary_"
  linkWorld += "Discretionary/World_Discretionary_"
}


linkState = "DataFiles/Maps/AwardsByLocation/US/" + linkState + opdiv.toUpperCase() + ".html"
linkWorld = "DataFiles/Maps/AwardsByLocation/World/" + linkWorld + opdiv.toUpperCase() + ".html"

// linkState = "CountryStateMapAwardsFiles_HTML/" + linkState + opdiv.toUpperCase() + ".html"
// linkWorld = "CountryStateMapAwardsFiles_HTML/" + linkWorld + opdiv.toUpperCase() + ".html"


$('#mapLinkWorld').attr("href", linkWorld)
$('#mapLinkState').attr("href", linkState)

};

// hide and show each class to toggle on map zoom level




function getLegend(opdiv, type) {

  var legendWorld = 'Legend_World_'
  var legendState = 'Legend_State_'

  if (type === "totalAwards") {
    legendWorld += "All_"
    legendState += "All_"
  } else {
    legendWorld += "Discretionary_"
    legendState += "Discretionary_"
  }

  legendWorld += opdiv.toUpperCase() + ".txt"
  legendState += opdiv.toUpperCase() + ".txt"


  $.get('./Legend_World_Discretionary_aLL/' + legendWorld , function(data) {
    function toNumber(num){
      return Number(num)
    }
    var arrWorld = data.split("|").map(toNumber)
    arrWorld[0]= 0;

    $.get('./Legend_World_Discretionary_aLL/' + legendState , function(data) {
      var arrState = data.split("|").map(toNumber)
      arrState[0]= 0;
      updateLegend(arrState, arrWorld)
    });

  });


}

function createMapBox(awarddollars_opdiv, BREAKS_WORLD, BREAKS_USA){

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-98, 38.88],
    minZoom: 2,
    zoom: 1
  });

  var zoomThreshold = 3;

  map.addControl(new mapboxgl.NavigationControl());

 //***** CREATE THE NEW TABLE HERE ******

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

createMapBox("awarddollars_hhs", allBreaks.BREAKS_ALL_HHS_WORLD, allBreaks.BREAKS_ALL_HHS_USA)
getLegend("HHS")
