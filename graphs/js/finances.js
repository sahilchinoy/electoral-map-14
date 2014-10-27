//districts = {'District1': {'Soto-Vigil':[26, 56], 'Maio': [22, 28]}, 'District2': {'Barry': [82, 178], 'Worthington': [69, 88]}, {'District4': {'Arreguin': [41, 49]}}}
//var data = [4, 8, 15, 16, 23, 42];

district1 = [[0, 8505, "#3399FF"], [8505, 13335, "#00FF00"]]
district1Breakdown = [[0, 26, "#3399FF"], [26, 56, "#3399FF"]]

district2 = [[0, 31700, "#3309FF"], [31700, 44692, "#00FF01"]]
district4 = [[0, 6705]]

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
	dScaler = getScale(d3.max(d3.max(district)))
	var paths = vis.selectAll("path")
		.data(district);
	paths.transition()
	 .duration(1000)
	 .attr("d", arc)
	  .style("fill", function(d){return d[2];})
	   .attr("transform", "translate(200,100)");

	paths.enter()
	 .append("path")
	  .attr("d", arc)
	   .style("fill", function(d){return d[2];})
	    .attr("transform", "translate(200,100)");
	paths.exit().remove()
}

function toggle() {
	console.log(district)
	district = (district == district1) ? district2 : district1;
  	update()
}

update()

/**
function mouseClick() {
	$(this).attr("stroke", "black")
	$(this).attr('stroke-width', 20)
}
$('.svg_donut').mouseover(mouseClick);
*/
