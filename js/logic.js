var electoralMap = angular.module('electoralMap', []);

var changeActive;

electoralMap.controller('electoralData', function ($scope) {
  $scope.district = 'Click a district to begin.';
  $scope.candidates = []
  $scope.active = null;
    
    changeActive = function(lastname) {
        $scope.active = lastname;
        $scope.$apply();
    }

  $scope.update = function(raceInfo) {
  	$scope.district = raceInfo.district;

    if ($scope.district == 'District 1') {
      chartDistrict = chartDistrict1;
        $scope.active = 'Soto-Vigil';
    }
    else if ($scope.district == 'District 4') {
      chartDistrict = chartDistrict4;
        $scope.active = 'Arreguin';
    }
    else if ($scope.district == 'District 7') {
      chartDistrict = chartDistrict7;
        $scope.active = 'Barry';
    }
    else if ($scope.district == 'District 8') {
      chartDistrict = chartDistrict8;
        $scope.active = 'Beier';
    }
    update();
  	$scope.candidates = raceInfo.candidates;
  	$scope.$apply();
  }

  $scope.handle = function() {
    $(".district").attr('stroke','none');
    $(this).attr('stroke','black');
    $(this).attr('stroke-width', 20);

    var this_race = data[$(this).attr('id')];
    $scope.update(this_race);
  }
  
  $scope.pieMouseover = function(candidate) {

      lastName = candidate.lastName;
      $scope.active = lastName;
      
      var paths = donut.selectAll("path")
		  .attr('stroke','none')
    
      d3.select('#' + lastName)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
      
      var chartData = financeBreakdown[lastName];
    
	   var bar = chart.selectAll("rect")
	  .data(chartData)
      .attr("fill", colors[lastName])

	   bar.exit().remove()
	   bar.enter()
	  .append("rect")
        .attr("fill", colors[lastName])

	   bar.transition()
	  .duration(1000)
	  .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
	  .attr("y", function(d) {return y(d); })
	  .attr("height", function(d) {return height - y(d); })
	  .attr("width", barWidth - 1)
  }
  
  $scope.isActive = function(candidate) {
      if ($scope.active == candidate.lastName) {
          return "selected";
      }
  }

  $('.district').mousedown($scope.handle);

});