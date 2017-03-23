

$(document).ready(function() {




// *****DISCRETIONARY MULTI LEVEL PIE *****

FusionCharts.ready(function () {
  var discretionaryChart = new FusionCharts({
    "type": 'multilevelpie',
    "renderAt": 'MLPChartContainer',
    "id": "mlpchart",
    "width": '100%',
    "height": '850',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSMLPChart.xml'
  });
  discretionaryChart.render();
});

FusionCharts.ready(function () {
  var pieAwardsChart = new FusionCharts({
    "type": 'pie2d',
    "renderAt": 'HHSawardsNumber',
    "id": "hhsawardsnumber",
    "width": '100%',
    "height": '850',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSawardsNumberInternationalPie.xml'
  });
  pieAwardsChart.render();
});

FusionCharts.ready(function () {
  var pieGrantChart = new FusionCharts({
    "type": 'pie2d',
    "renderAt": 'HHSgrantDollars',
    "id": "hhsgrantdollars",
    "width": '100%',
    "height": '850',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSgrantDollarsInternationalPie.xml'
  });
  pieGrantChart.render();
});


FusionCharts.ready(function () {
  var multiAgencyChart = new FusionCharts({
    "type": 'treemap',
    "renderAt": 'HHSMultiAgency',
    "id": "multiAgency",
    "width": '100%',
    "height": '850',
    "dataFormat": 'xmlurl',
    "dataSource": 'xmlFiles/HHSMultiAgency_Recipienttreemap.xml'
  });
  multiAgencyChart.render();
});





// ***** MULTI SELECT GRANT HIST CHART *****

renderChart('HHSgrantHist');

function renderChart(dataSource){
  FusionCharts.ready(function () {
    var myChart = new FusionCharts({
      "type": 'mscombidy2d',
      "renderAt": dataSource,
      "width": "100%",
      "height": "550",
      "dataFormat": "xmlurl",
      "dataSource": "xmlFiles/" + dataSource + ".xml"
    });
    myChart.render()
  });
}



$('#multiSelectDrop').multiselect();
  // set function to render graphs on change
  $('.selectOpt input[type="checkbox"]').on("change", function(){
    // gather selectedID. This value corresponds to the XML filename as well as the id of the div we render at.
    var selectedID = this.value;
    console.log(selectedID)
// var selectedLink = '<a href="DataFiles/GrantHistoryBarChart/' + selectedID + 'grantHistTable.html" class="grantHistTableLink">View Table</a>'
    // if event target is checked, render it's corresponding graph.
    if (this.checked) {
      renderChart(selectedID)
     $("#" + selectedID + "-link").removeClass('hidden')
     $("#" + selectedID + "-link").show()
    }
    else {
      $("#" + selectedID).empty()
      $("#" + selectedID + "-link").hide()
    }

 

  });


  $('#masterSelect').multiselect();

  $('#masterSelect').on("change", function(){
    var selectedOpdiv = this.value.toLowerCase();

    setOpdiv(selectedOpdiv)
  });
  
  function setOpdiv(selectedOpdiv){
    var selection = selectedOpdiv.toUpperCase() + "grantHist";
    var selection2 = "awarddollars_" + selectedOpdiv.toUpperCase();

    $('.selectOpt input:checked').click()
    $('.selectOpt input:checkbox[value=' + selection + ']').click()
    $('.radioOpt input:radio[value=' + selection2 + ']').click()
    $('.topMapOpt input:checked').click()
    $('.topMapOpt input:checkbox[value=' + selectedOpdiv.toUpperCase() + ']').click()
    $('input:checkbox[value="selectAll"]').click()

  }





  if (window.location.search) {
    setTimeout(function(){  
     $('.masterOpt input:radio[value=' + window.location.search.substring(1).toUpperCase() + ']').click()

   }, 10000);

  }


});



