var financeBreakdown = {'Barry': [14450, 17250], 'Maio': [8000, 1350], 'Arreguin': [5505, 1200], 'Worthington': [9742, 3250], 'Soto-Vigil': [3850, 4655]}
var colors = {'Soto-Vigil': "#3399FF", 'Arreguin': "#00FF00", "Barry": "#3309FF", "Worthington": "#00FF01"}

var chartDistrict1 = [[8505, 'Soto-Vigil'], [9350, 'Maio']]
var chartDistrict7 = [[31700, 'Barry'], [12922, 'Worthington']]
var chartDistrict4 = [[6705, 'Arreguin']]

var chartDistrict = chartDistrict1;

/** myScale(0) = 0, myScale(max) = 2*pi */
function getScale(totalContributions) {
	return d3.scale.linear().domain([0, totalContributions]).range([0, 2 * Math.PI]);
}

var radius = 150
var pie = d3.layout.pie().value(function(d){return d[0];})

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var donut = d3.select("#svg_donut")
    .attr("width", 300)
    .attr("height", 300)
    .append("g")
    .attr("transform", "translate(" + 300 / 2 + "," + 300 / 2 + ")");

function update() {
	var piedata = pie(chartDistrict);

	var path = donut.selectAll("path")
	    .data(piedata);

	path.exit().remove();

	path.enter()
	  	.append("path")
	  	.attr("d", arc)

	path
		.attr("id", function(d, i){return i})
	    .style("fill", function(d, i){return colors[chartDistrict[i][1]];});

	var text = donut.selectAll("text")
		.data(piedata)

	text.exit().remove()
	text
	    .enter()
	    .append("text")
	    .attr("text-anchor", "middle");

	 text
	 	.attr("x", function(d) {
	        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
	        d.cx = Math.cos(a) * (radius - 75);
	        return d.x = Math.cos(a) * (radius - 20);
	    })
	    .attr("y", function(d) {
	        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
	        d.cy = Math.sin(a) * (radius - 75);
	        return d.y = Math.sin(a) * (radius - 20);
	    })
	    .text(function(d) { return "$" + d.value.toString(); })
	    .each(function(d) {
	        var bbox = this.getBBox();
	        d.sx = d.x - bbox.width/2 - 2;
	        d.ox = d.x + bbox.width/2 + 2;
	        d.sy = d.oy = d.y + 5;
	    });

	donut.append("defs").append("marker")
	    .attr("id", "circ")
	    .attr("markerWidth", 6)
	    .attr("markerHeight", 6)
	    .attr("refX", 3)
	    .attr("refY", 3)
	    .append("circle")
	    .attr("cx", 3)
	    .attr("cy", 3)
	    .attr("r", 3);

	var path_pointer = donut.selectAll("path.pointer")
		.data(piedata)
	path_pointer
		.enter()
	    .append("path")
	    .attr("class", "pointer")
	    .style("fill", "none")
	    .style("stroke", "black")
	    .attr("marker-end", "url(#circ)")

	path_pointer
		.attr("d", function(d) {
	        if(d.cx > d.ox) {
	            return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
	        } else {
	            return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
	        }
	    });
	updateCharts();
}

var margin = {top: 20, right: 30, bottom: 30, left: 50},
    width = 150 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var y = d3.scale.linear()
    .range([height, 0])
	.domain([0, 25000]);

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1)
	.domain(["In", "Out"])

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "$")

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")

var chart = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.left + margin.right)
   .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("g")
	 .attr("class", "y axis")
	 .call(yAxis)

chart.append("g")
	 .attr("class", "x axis")
	 .attr("transform", "translate(0," + height + ")")
	 .call(xAxis)

chart.append("text")
	 .attr("transform", "rotate(-90)")
     .attr("y", 10)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("Dollars Donated");

var barWidth = width / 2;

function updateCharts() {
	if (selected > chartDistrict.length) {
		selected = 0;
	}

	var chartData = financeBreakdown[chartDistrict[selected][1]];

	chart
		.attr("fill", colors[chartDistrict[selected][1]])

	var bar = chart.selectAll("rect")
	  .data(chartData)

	bar.exit().remove()
	bar.enter()
	  .append("rect")

	bar.transition()
	  .duration(1000)
	  .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
	  .attr("y", function(d) {return y(d); })
	  .attr("height", function(d) {return height - y(d); })
	  .attr("width", barWidth - 1)
}

var selected = 0;
update();

$("path").click(function() {
	selected = this.id
  	updateCharts();
  	var paths = d3.selectAll("path")
	  .attr('stroke','none')
  	$(this).attr('stroke','black');
	$(this).attr('stroke-width',2);
});










