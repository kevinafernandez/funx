$(function () {

  // create initial empty chart with basic config
  var context = document.getElementById('chart');
  var myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      legend: {
        display: false,
        padding: 50
      },
      scales: {
        yAxes: [{ // Y scale
          scaleLabel: {
            display: true,
            labelString: 'REPRODUCCIONES'
          },
          ticks: {
            min: 0,
            fontColor: "black",
            stepSize: 5
          }
        }],
        xAxes: [{ //X scale
          scaleLabel: {
            display: true,
            labelString: 'ARTISTAS'
          }
        }]
      }
    }
  });

  // AJAX request to get data
  var endpoint = 'http://localhost:3000/api/v1/albums'; // in case you're using another port or URL please change 
  $.ajax({
    url: endpoint,
    method: 'GET',
    success: function (response) {
      buildChart(response.data); //logic for fill chart with data from API
    },
    error: function () {
      $('.info').append('Error de conexión con servidor API, verifica.').css('display', 'block');
      $('#chart, .title').css('display', 'none');
    }
  });


  function buildChart(dataApi) {
    var total_played = [];
    var artists = [];
    var backgroundColor = [];
    var borderColor = [];

    //map from dataApi to fill empty arrays with data
    dataApi.map(function (object) {
      artists.push(object.attributes.artist_name);
      total_played.push(object.attributes.total_played);
      var colors = dynamicColors();
      backgroundColor.push(colors.background);
      borderColor.push(colors.border);
    })

    // fill datasets to display data in charts
    myChart.data.datasets.push({
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
      data: total_played, //show quantity of albums played in Y scale
    });

    // show artist name in X scale
    myChart.data.labels = artists;


    // Fill data for tooltips when hover in a specific bar

    // display name of album
    myChart.options.tooltips.callbacks.beforeLabel = function (tooltipItem, data) {
      var index = tooltipItem["index"]; //specific coordenates from each bar in scale X and scale Y
      return `Álbum: ${dataApi[index].attributes.name}`;
    }

    // display total played songs per artist
    myChart.options.tooltips.callbacks.label = function (tooltipItem, data) {
      var index = tooltipItem["index"];
      return `Reproducciones: ${dataApi[index].attributes.total_played}`;
    }

    // display release_date for album
    myChart.options.tooltips.callbacks.afterLabel = function (tooltipItem, data) {
      var index = tooltipItem["index"];
      var release_date = dataApi[index].attributes.release_date;
      if (release_date != null) {
        return `Lanzamiento: ${release_date}`;
      }
    }

    myChart.update(); // re-render the chart
  }

  // create random's colors for bars in chart
  function dynamicColors() {
    var r = Math.floor((Math.random() * 255));
    var g = Math.floor((Math.random() * 255));
    var b = g + 25;
    var a = 0.40; //transparency
    var background = `rgb(${r},${g},${b}, ${a})`;
    var border = `rgb(${r - 50},${g - 50},${b - 50})`;
    return {
      "background": background,
      "border": border
    }
  }

  // default config
  Chart.defaults.global.defaultFontFamily = "Poppins-Regular";
  Chart.defaults.global.defaultFontSize = 14;
});