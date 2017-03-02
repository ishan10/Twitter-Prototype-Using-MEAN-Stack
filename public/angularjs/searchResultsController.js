var searchResults = angular.module('searchResults', []);


searchResults.controller('ResultsDisplayController', function($scope,$http) {
	$scope.showProfile=false;
	$scope.showProfileTweet=false;
	$http({
		 method: "POST",
		 url : '/getSearchResults',
	 }).success(function(data) {
		 if(data.statusCode=="searchHash"){
			 	$scope.showProfile=true;
				$scope.showProfileTweet=false;
			 $scope.resultList = data.results;
		 }
		 if(data.statusCode=="searchProfile"){
			 	$scope.showProfile=false;
				$scope.showProfileTweet=true;
			$scope.resultList = data.results;
		 }
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
});