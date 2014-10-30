var financeBreakdown = {'Barry': [17200, 21200], 'Maio': [20450, 4400], 'Arreguin': [18015, 5250], 'Worthington': [21859, 9550],
 'Soto-Vigil': [10350, 10760], 'Beier': [12595, 2050], 'Cohen': [26715, 6150], 'McCormick': [12775, 2700], 'Droste': [17325, 24345]}
var colors = {'Soto-Vigil': "#3399FF", 'Arreguin': "#12FF00", "Barry": "#3309FF", "Worthington": "#00FF01",
			  'Beier': "#6644FF", 'Cohen': "#3349FF", 'McCormick': "#3309FF", "Droste": "#00FF01" }

var chartDistrict1 = [[21110, 'Soto-Vigil'], [24850, 'Maio']]
var chartDistrict7 = [[38400, 'Barry'], [31409, 'Worthington']]
var chartDistrict4 = [[23265, 'Arreguin']]
var chartDistrict8 = [[14645, 'Beier'],[32865, 'Cohen'],[15475, 'McCormick'],[41670, 'Droste']]

var chartDistrict = chartDistrict8;

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
    .attr("width", 370)
    .attr("height", 370)
    .append("g")
    .attr("transform", "translate(" + 300 / 2 + "," + 300 / 2 + ")");

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

function changeWithClick(d, i) {
	updateCharts(i)
	var paths = donut.selectAll("path")
		  .attr('stroke','none')
    d3.select(this)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
}

function update() {
	var piedata = pie(chartDistrict);
	var path = donut.selectAll("path")
	    .data(piedata);
	path.exit().remove();
	path.enter()
	  	.append("path")
	  	.classed("donut_arc", true)
	  	.on("click",changeWithClick)
	path.attr("stroke", "none")
	path.filter(function(d, i) {return i == 0})
		.attr('stroke', 'black')
		.attr('stroke-width', 2);
	path
	    .classed("donut_arc", true)
		.attr("d", arc)
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
	updateCharts(0);
}

var margin = {top: 20, right: 30, bottom: 30, left: 70},
    width = 150 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var y = d3.scale.linear()
    .range([height, 0])
	.domain([0, 30000]);

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
     .attr("y", -70)
     .attr("x", -100)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("Dollars Donated");

var barWidth = width / 2;

function updateCharts(selected) {
	if (selected > chartDistrict.length-1) {
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
update();
/**
	var path_pointer = donut.selectAll("path.pointer")
		.data(piedata)
	path_pointer.exit().remove()
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
	    });*/










