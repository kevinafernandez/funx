window.addEventListener('load', function () {

	// create initial empty chart
	var context = document.getElementById('chart');
	var myChart = new Chart(context, {
		type: 'bar',
		data: {
			labels: [],
			datasets: []
		},
		options: {
			responsive: true,
			title: { // leyend title
				display: true,
				fontColor: 'grey',
				fontStyle: 'bold',
				text: 'Leyenda',
				padding: 15
			},
			scales: {
				yAxes: [{ //eye Y
					scaleLabel: {
						display: true,
						labelString: 'REPRODUCCIONES'
					},
					ticks: {
						min: 0,
						stepSize: 5,
					}
				}],
				xAxes: [{ //eye X
					scaleLabel: {
						display: true,
						labelString: 'ARTISTAS'
					}
				}]
			}
		}
	});

	// AJAX request to get data
	var endpoint = 'http://localhost:3000/api/v1/albums';
	$.ajax({
		url: endpoint,
		method: 'GET',
		success: function (response) {
			$.each(response.data, function (i, data) {
				buildChart(data);
			})
		},
		error: function () {
			$('.info').append('Error de conexión con servidor API, verifica.').css('display', 'block');
			$('#chart, .title').css('display', 'none');
		}
	});

	// fill the chart with data
	function buildChart(data) {

		// data for datasets
		myChart.data.datasets.push({ 
			backgroundColor: dynamicBackground(),
			borderWidth: 1,
			borderColor: '#e0e7ea',
			data: [data.attributes.total_played],
			label: [data.attributes.owner],
			album: [data.attributes.name],
			release_date: [data.attributes.release_date]
		});
		
		//myChart.data.labels.push(data.attributes.owner); //falta label abajo

		// display artist name
		myChart.options.tooltips.callbacks.title = function (tooltipItem, data) { 
			for (i = 0; i < data["datasets"].length; i++) {
				return `${data.datasets[tooltipItem[i]["datasetIndex"]]["label"]}`;
			};
		}

		// display album name
		myChart.options.tooltips.callbacks.beforeLabel = function (tooltipItem, data) {
			for (i = 0; i < data["datasets"].length; i++) {
				return `Albúm: ${data.datasets[tooltipItem["datasetIndex"]]["album"]}`;
			};
		}

		// display total played songs per artist
		myChart.options.tooltips.callbacks.label = function (tooltipItem, data) {
			for (i = 0; i < data["datasets"].length; i++) {
				return `Reproducciones: ${data.datasets[i]["data"]}`;
			};
		}
		
		// display release date album
		myChart.options.tooltips.callbacks.afterLabel = function (tooltipItem, data) {
			for (i = 0; i < data["datasets"].length; i++) {
				var release_date = data.datasets[tooltipItem["datasetIndex"]]["release_date"][i];
				if (release_date != null) {
					return `Lanzamiento: ${release_date}`;
				}
			};
		}

		myChart.update(); // re-render the chart
	}
	
	// create random's backgrounds for bar's in chart
	function dynamicBackground() { 
		var r = Math.floor((Math.random() * 255) + 50);
		var g = Math.floor((Math.random() * 255) + 50);
		var b = Math.floor((Math.random() * 255) + 50);
		return "rgb(" + r + "," + g + "," + b + ")";
	}			var x = 0;

	// default config
	Chart.defaults.global.defaultFontFamily = "Poppins-Regular";
	Chart.defaults.global.defaultFontSize = 15;
})
