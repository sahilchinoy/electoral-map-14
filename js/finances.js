var financeBreakdown = {'Barry': [17875, 19465], 'Maio': [15750, 4800], 'Arreguin': [7505, 3950], 'Worthington': [15877, 7800],
 'Soto-Vigil': [5450, 5405], 'Beier': [15895, 2500], 'Cohen': [22420, 5500], 'McCormick': [13475, 2800], 'Droste': [12795, 21470], 'Mitchell': [0, 0]}
var colors = {'Soto-Vigil': "#fdcdac", 'Arreguin': "#b3e2cd", "Barry": "#fdcdac", "Worthington": "#b3e2cd", 'Beier': "#b3e2cd", 'Cohen': "#fdcdac", 'McCormick': "#cbd5e8", "Droste": "#f4cae4", "Maio":"#b3e2cd" }

var chartDistrict1 = [[10855, 'Soto-Vigil'], [20550, 'Maio'], [0, 'Mitchell']]
var chartDistrict7 = [[37340, 'Barry'], [23677, 'Worthington']]
var chartDistrict4 = [[11455, 'Arreguin']]
var chartDistrict8 = [[18395, 'Beier'],[27920, 'Cohen'],[16275, 'McCormick'],[34265, 'Droste']]

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
    changeActive(this.id);
}

function update() {
	var piedata = pie(chartDistrict);
	var path = donut.selectAll("path")
	    .data(piedata);
	path.exit().remove();
	path.enter()
	  	.append("path")
	  	.classed("donut_arc", true)
	  	.on("mouseover",changeWithClick)
	path.attr("stroke", "none")
	path.filter(function(d, i) {return i == 0})
		.attr('stroke', 'black')
		.attr('stroke-width', 2);
	path
	    .classed("donut_arc", true)
		.attr("d", arc)
		.attr("id", function(d, i){return chartDistrict[i][1]})
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
	    .text(function(d) { return d3.format("$,.0f")(d.value); })
	    .each(function(d) {
	        var bbox = this.getBBox();
	        d.sx = d.x - bbox.width/2 - 2;
	        d.ox = d.x + bbox.width/2 + 2;
	        d.sy = d.oy = d.y + 5;
	    });
	updateCharts(0);
}

var margin = {top: 20, right: 30, bottom: 0, left: 70},
    width = 150 - margin.left - margin.right,
    height = 230 - margin.top - margin.bottom;

var y = d3.scale.linear()
    .range([height, 0])
	.domain([0, 30000]);

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1)
	.domain(["In Berkeley", "Out of Berkeley"])

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "$")
    .tickFormat(d3.format("$,.0f"))

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
.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-50)" 
                });

chart.append("text")
	 .attr("transform", "rotate(-90)")
     .attr("y", -70)
     .attr("x", -100)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("$ contributed");

var barWidth = width / 2;

function updateCharts(selected) {
	if (selected > chartDistrict.length-1) {
		selected = 0;
	}
	var chartData = financeBreakdown[chartDistrict[selected][1]];
    
	var bar = chart.selectAll("rect")
	  .data(chartData)
      .attr("fill", colors[chartDistrict[selected][1]])

	bar.exit().remove()
	bar.enter()
	  .append("rect")
        .attr("fill", colors[chartDistrict[selected][1]])

	bar.transition()
	  .duration(1000)
	  .attr("transform", function(d, i) { return "translate(" + (i * barWidth + 1) + ",0)"; })
	  .attr("y", function(d) {return y(d); })
	  .attr("height", function(d) {return height - y(d); })
	  .attr("width", barWidth - 2)
}
//update();
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










