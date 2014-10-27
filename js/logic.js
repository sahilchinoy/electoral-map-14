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
  $(".district").attr('stroke','none');
	$(this).attr('stroke','black');
	$(this).attr('stroke-width',20);

