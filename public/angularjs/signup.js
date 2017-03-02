/** Module for Twitter Sign-up form**/

	var signUp = angular.module('signUp', []);

 signUp.controller('SignUpController', function($scope, $http) {
	 console.log("inside controller");
	 $scope.showSignupForm = false;
	 $scope.showSignupSuccess=true;
	 $scope.existingUserName = true;
	 $scope.unexpected_error = true;
	 $scope.twitterSignUp = function(){
		 $http({
			 method: "POST",
			 url : '/checkUser',
			 data: {
				 "firstname" : $scope.firstname,
				 "lastname" : $scope.lastname,
				 "email" : $scope.email,
				 "password" : $scope.password,
				 "userid" : $scope.userid,
				 "birthday" : $scope.birthday,
				 "location" : $scope.location,
				 "contact" : $scope.contact
			 }
		 }).success(function(data) {
			 if(data.statusCode=="userCreated"){
				 $scope.showSignupForm = true;
				 $scope.showSignupSuccess=false;
				// window.location.assign("/success"); 
			 }
			 else if (data.statusCode == "userExists"){
				 $scope.existingUserName = false;
			 } 
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	 };
	 $scope.home = function () {
		 window.location.assign('/home');
		}
	 
	 
});