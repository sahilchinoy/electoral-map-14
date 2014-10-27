var financeBreakdown = {'Barry': [13050, 16300], 'Maio': [3500, 1350], 'Arreguin': [5455, 1200], 'Worthington': [9492, 2675], 'Soto-Vigil': [3850, 4655]}
var colors = {'Soto-Vigil': "#3399FF", 'Arreguin': "#00FF00", "Barry": "#3309FF", "Worthington": "#00FF01"}

var district1 = [[0, 8505, "#3399FF", 'Soto-Vigil'], [8505, 13335, "#00FF00", 'Arreguin']]
var district2 = [[0, 31700, "#3309FF", 'Barry'], [31700, 44692, "#00FF01", 'Worthington']]
var district4 = [[0, 6705]]

var district = district1

/** myScale(0) = 0, myScale(max) = 2*pi */
function getScale(totalContributions) {
	return d3.scale.linear().domain([0, totalContributions]).range([0, 2 * Math.PI]);
}

var vis = d3.select("#svg_donut");

dScaler = getScale(d3.max(d3.max(district)))

var arc = d3.svg.arc()
 .innerRadius(45)
 .outerRadius(100)
  .startAngle(function(d){return dScaler(d[0]);})
   .endAngle(function(d){return dScaler(d[1]);});

function update() {
	document.getElementById("Candidate1").innerHTML = district[0][3]
	document.getElementById("Candidate1").style.color = colors[district[0][3]]
	document.getElementById("Candidate2").innerHTML = district[1][3]
	document.getElementById("Candidate2").style.color = colors[district[1][3]]

	dScaler = getScale(d3.max(d3.max(district)))
	var paths = vis.selectAll("path")
		.data(district);
	paths.transition()
	 .duration(1000)
	 .attr("id", function(d, i){return d[3]})
	 .attr("d", arc)
	  .style("fill", function(d){return d[2];})
	   .attr("transform", "translate(200,100)");

	paths.enter()
	 .append("path")
	  .attr("id", function(d){return d[3]})
	  .attr("d", arc)
	   .style("fill", function(d){return d[2];})
	    .attr("transform", "translate(200,100)");

	paths.exit().remove()
}

function updateCharts(candidateName) {
	var width = 100,
    height = 400;
	var y = d3.scale.linear()
	    .range([height, 0]);
	var chart = d3.select("#chart")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("fill", colors[candidateName]);

	data = financeBreakdown[candidateName];

	y.domain([0, 20000]);

	var barWidth = width / 2;

	var bar = chart.selectAll("rect")
	  .data(data)

	bar.enter()
	  .append("rect")
	  .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })

	bar.transition()
	  .duration(1000)
	  .attr("y", function(d) {return y(d); })
	  .attr("height", function(d) {return height - y(d); })
	  .attr("width", barWidth - 1)

	bar.exit().remove()
}

function toggle() {
	district = (district == district1) ? district2 : district1;
  	update()
  	// update the chart with correct clicked part of pie chart
}

update()
updateCharts(district[0][3])

$("path").click(function() {
	console.log(this.id)
  	updateCharts(this.id)
  	var paths = d3.selectAll("path")
	  .attr('stroke','none')
  	$(this).attr('stroke','black');
	$(this).attr('stroke-width',2);
});










