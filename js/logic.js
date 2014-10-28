var electoralMap = angular.module('electoralMap', []);

electoralMap.controller('electoralData', function ($scope) {
  $scope.district = 'District';
  $scope.candidates = []

  $scope.update = function(raceInfo) {
  	$scope.district = raceInfo.district;

    if ($scope.district == 'District 1') {
      chartDistrict = chartDistrict1;
    }
    /*else if ($scope.district == 'District 4') {
      chartDistrict = chartDistrict4;
    }*/
    else if ($scope.district == 'District 7') {
      chartDistrict = chartDistrict7;
    }
    /*else if ($scope.district == 'District 8') {
      chartDistrict = chartDistrict8;
    }*/

    update();

  	$scope.candidates = raceInfo.candidates;
  	$scope.$apply();
  }

  $scope.handle = function() {
  $(".district").attr('stroke','none');
  $(this).attr('stroke','black');
  $(this).attr('stroke-width',20);

  var this_race = data[$(this).attr('id')];
  $scope.update(this_race);
}

  $('.district').mouseover($scope.handle);


});