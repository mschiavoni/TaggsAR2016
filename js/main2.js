

$(document).ready(function() {

// *****DISCRETIONARY MULTI LEVEL PIE *****

FusionCharts.ready(function () {
  var discretionaryChart = new FusionCharts({
    "type": 'multilevelpie',
    "renderAt": 'MLPChartContainer',
    "id": "mlpchart",
    "width": '100%',
    "height": '700',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSMLPChart.xml'
  });
  discretionaryChart.render();
});

FusionCharts.ready(function () {
  var discretionaryChart = new FusionCharts({
    "type": 'pie2d',
    "renderAt": 'HHSawardsNumber',
    "id": "hhsawardsnumber",
    "width": '100%',
    "height": '600',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSawardsNumberInternationalPie.xml'
  });
  discretionaryChart.render();
});

FusionCharts.ready(function () {
  var discretionaryChart = new FusionCharts({
    "type": 'pie2d',
    "renderAt": 'HHSgrantDollars',
    "id": "hhsgrantdollars",
    "width": '100%',
    "height": '600',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSgrantDollarsInternationalPie.xml'
  });
  discretionaryChart.render();
});



// ***** MULTI SELECT GRANT HIST CHART *****

  // On page load, we hardcode the rendering of the first graph in the list.
  renderChart('HHSgrantHist');
  /**
   * function to gather the data and render a chart at a given location.
   *
   *  renderChart
{String} dataSource - both the id of the div and the name of the xml.
*/
function renderChart(dataSource){
  FusionCharts.ready(function () {
    var myChart = new FusionCharts({
      "type": 'mscombidy2d',
      "renderAt": dataSource,
      "width": "100%",
      "height": "500",
      "dataFormat": "xmlurl",
      "dataSource": "xmlFiles/" + dataSource + ".xml"
    });
    myChart.render();
  });
}


$('#multiSelectDrop').multiselect();

  // set function to render graphs on change
  $('.selectOpt input[type="checkbox"]').on("change", function(){
    // gather selectedID. This value corresponds to the XML filename as well as the id of the div we render at.
    var selectedID = this.value;
    // if event target is checked, render it's corresponding graph.
    if (this.checked) {
      renderChart(selectedID)
    }
    // if it is unchecked, remove it's corresponding graph.
    else {
      $("#" + selectedID).empty()
    }
  });



$('#mapDrop').multiselect();

  // set function to render graphs on change
  $('#mapDrop').on("change", function(){
    var selectedID = this.value.toLowerCase();
    createMapBox(selectedID)
  });

});



