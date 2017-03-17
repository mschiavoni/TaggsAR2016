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
  $('#topAwardsLink').attr("href", "Top50_Recipients_Discretionary_All/Top50_Recipients_Discretionary_HHS.html" )

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
linkAll = "Top50_Recipients_Discretionary_All/" + linkAll + opdiv.toUpperCase() + ".html"
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

