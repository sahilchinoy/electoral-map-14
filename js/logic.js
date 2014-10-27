var electoralMap = angular.module('electoralMap', []);

electoralMap.controller('electoralData', function ($scope) {
  $scope.district = 'District';
  $scope.candidates = []

  $scope.update = function(raceInfo) {
  	$scope.district = raceInfo.district;
  	$scope.candidates = raceInfo.candidates;
  	$scope.$apply();
  }

  $scope.handle = function() {
	$(this).attr('stroke','black');
	$(this).attr('stroke-width',20);

	var this_race = data[$(this).attr('id')];
	$scope.update(this_race);
}

  $('.district').mouseover($scope.handle);


});

function removeBorder() {
	$(this).attr('stroke','none');
}

$('.district').mouseout(removeBorder);