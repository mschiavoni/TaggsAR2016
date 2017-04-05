mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw';
        //create a map using the Mapbox Light theme, zoomed out to show world view
     



var map2;


$('#map2DropInt').multiselect({
  maxHeight: 400,
  dropUp: true,
  includeSelectAllOption: true,
  selectAllText:'HHS (Select All)'
}).on("change", changeIntOpdivs)


function changeIntOpdivs() {
var topIntOptions = $('.topIntMapOpt input:checked')
  var intOpdivsOn = [];
  for (var i= 0; i < topIntOptions.length; i++) {
    intOpdivsOn.push(topIntOptions[i].value);
  }


if (intOpdivsOn.length === 1){
  getLinkTopInt(intOpdivsOn[0])
} else {
$('#topAwardsLinkInt').attr("href", "/DataFiles/Maps/TopAwardRecipients/Top50DiscretionaryWorld/Top50_Recipients_Discretionary_International_HHS.html")
}


  map2.setFilter('foreign_recipients', ["in", 'org_acronym'].concat(intOpdivsOn))
    // return opdivsOn.indexOf(f.properties['org_acronym']) !== -1;
  return false;
}

function getLinkTopInt(opdiv){
 var linkInt =  "Top50_Recipients_Discretionary_International_";
linkInt = "DataFiles/Maps/TopAwardRecipients/Top50DiscretionaryWorld/" + linkInt + opdiv.toUpperCase() + ".html"
$('#topAwardsLinkInt').attr("href", linkInt)


};

 function createMapBoxTopInt() {


     map2 = new mapboxgl.Map({
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
            map2.addSource('foreign_recip', {
                type: 'vector',
                url: 'mapbox://gcline001.cizijsc9u002x2qt9pj9jrtkn-16hy4'
            });
            map2.addLayer({
                'id': 'foreign_recipients',
                'source': 'foreign_recip',
                'source-layer': 'ForeignRecipLatLong',
                //'maxzoom': zoomThreshold,
               'type': 'circle',
                'paint': {
                    'circle-opacity': 0.4,
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
                            ['ASPR', '#03A9F4'],
                            ['CDC', '#4FC3F7'],
                            ['FDA', '#00BCD4'],
                            ['HRSA', '#4DD0E1'],
                            ['NIH', '#26A69A'],
                            ['OASH', '#81C784'],
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
                var features = map2.queryRenderedFeatures(e.point, { layers: ['foreign_recipients'] });
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
                        + "Country: " + feature.properties.recip_country
                        + "<br>"
                        + "Agency: " + feature.properties.org_acronym
                        + "<br>"
                        + "Total Award Amount: " + num
                        + "<br>"
                        + "No. of Awards: " + feature.properties.total_number_awards
                        + "<br>"
                        )
                    .addTo(map2);
            });

            }
