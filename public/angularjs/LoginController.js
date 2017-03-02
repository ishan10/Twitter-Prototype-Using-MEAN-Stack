/**
 * Controller for Login
 */


var loginApp = angular.module('loginApp', []);

loginApp.controller('LoginController', function($scope, $http) {
	$scope.existingUserName = true;
	$scope.unexpected_error = true;
	$scope.login = function(){
		 $http({
			 method: "POST",
			 url : '/login',
			 data: {
				 "email" : $scope.email,
				 "password" : $scope.password
			 }
		 }).success(function(data) {
			 if(data.statusCode=="validLogin"){
				 window.location.assign("/twitterHome"); 
			 }
			 else if (data.statusCode == "invalidLogin"){
				 $scope.existingUserName = false;
			 } 
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	 };
	
});