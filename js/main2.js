
$(document).ready(function() {

renderChart(HHSgrantHist)

   function renderChart(dataSource){

    FusionCharts.ready(function () {
      var myChart = new FusionCharts({
        "type": 'mscolumn2d',
        "renderAt": "HHSgrantHist",
        "width": "100%",
        "height": "500",
        "dataFormat": "xmlurl",
        "dataSource": "HHSgrantHist.xml"
      });

      myChart.render();
    });

  }


  $('#example-getting-started').multiselect();

  $('.test input[type="checkbox"]').on("change", function(){

    var selectedID = this.value;


    if (this.checked) {
      renderChart(selectedID)

    }
    else {
     $("#" + selectedID).empty()
   }


   function renderChart(dataSource){

    FusionCharts.ready(function () {
      var myChart = new FusionCharts({
        "type": 'mscolumn2d',
        "renderAt": selectedID,
        "width": "100%",
        "height": "500",
        "dataFormat": "xmlurl",
        "dataSource": selectedID + ".xml"
      });

      myChart.render();
    });

  }


})
});