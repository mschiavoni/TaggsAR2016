mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NsaW5lMDAxIiwiYSI6ImNpd3o1aG9kdTAxOGgydG8wOXA1emlyMTEifQ.FtviOLuh7BVrbQlZvwsTOw';

$(function(){
 $('button.multiselect').each(function(i){
  $(this).addClass("dropDown" + i)
  $('.dropDown2').css("display", "none")
})

})

var map2;
var topLegend = document.getElementById('topLegend');
var topIntLegend = document.getElementById('topIntLegend');


$('#map2Drop').multiselect({
  maxHeight: 400,
  dropUp: true,
  includeSelectAllOption: true,
  selectAllText:'HHS (Select All)',
  selectAllValue: 'selectAll'
}).on("change", changeOpdivs)


function changeOpdivs() {



  var topOptions = $('.topMapOpt input:checked')
  var opdivsOn = [];
  for (var i= 0; i < topOptions.length; i++) {
    opdivsOn.push(topOptions[i].value);
  }

 if (opdivsOn.length === 1){
  getLinkTop(opdivsOn[0])

} else {
  $('#topAwardsLink').attr("href", "Top50_Recipients_Discretionary_ALL/Top50_Recipients_Discretionary_HHS.html" )

}



  map2.setFilter('us_recipients', ["in", 'org_acronym'].concat(opdivsOn))
    return false;


  }



  
  $('#topIntLegend').css("display", "none")
  $('#topAwardsLinkInt').css('display', 'none')

  $('input[name="topAwards"]').click(function(){
    var selectedRecipientType = this.id

    if (selectedRecipientType === "topAwards"){

      createMapBoxTop()
      $('#topIntLegend').css("display", "none")
      $('#topLegend').css("display", "block")
      $('.dropDown2').css("display", "none")
      $('.dropDown1').css("display", "block")
      $('#topAwardsLink').css('display', 'block')
      $('#topAwardsLink').css('display', 'block')
      $('#topAwardsLinkInt').css('display', 'none')

    } else {

      createMapBoxTopInt()
      $('#topLegend').css("display", "none")
      $('#topIntLegend').css("display", "block")
      $('.dropDown1').css("display", "none" )
      $('.dropDown2').css("display", "block" )
      $('#topAwardsLink').css('display', 'none')
      $('#topAwardsLinkInt').css('display', 'block')

    }
  });


function getLinkTop(opdiv){
 var linkAll = "Top50_Recipients_Discretionary_";
linkAll = "Top50_Recipients_Discretionary_ALL/" + linkAll + opdiv.toUpperCase() + ".html"
$('#topAwardsLink').attr("href", linkAll)

};


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
                'paint': {
                    'circle-opacity': 0.4,
            'circle-radius': {
              'base': 3,
              'stops': [[12, 10], [22, 100]]
            },

            'circle-color': {
              property: 'org_acronym',
              type: 'categorical',
              stops: [
              ['ACF', '#304FFE'],
              ['ACL', '#3D5AFE'],
              ['AHRQ', '#2962FF'],
              ['ASPE', '#2979FF'],
              ['ASPR', '#0091EA'],
              ['CDC', '#00B0FF'],
              ['CMS', '#00B8D4'],
              ['FDA', '#00E5FF'],
              ['HRSA', '#00BFA5'],
              ['IHS', '#1DE9B6'],
              ['NIH', '#00C853'],
              ['OASH', '#00E676'],
              ['OGA', '#76FF03'],
              ['ONC', '#C6FF00'],
              ['SAMHSA', '#FFEA00']
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


    if (window.location.search) {

     $('.masterOpt input:radio[value=' + window.location.search.substring(1).toUpperCase() + ']').click()

  }


    }

    createMapBoxTop()

