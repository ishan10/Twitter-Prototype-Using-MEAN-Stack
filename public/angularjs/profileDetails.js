var profileDetails = angular.module('profileDetails', []);

profileDetails.controller('ProfileDetailsController', function($scope,$http) {
	$scope.showFeed = false;
	$scope.showFollowingList = false;
	$scope.showFollowersList = false;
	$http({
		 method: "POST",
		 url : '/getProfileDetails',
	 }).success(function(data) {
		 if(data.statusCode=="profilePageData"){
			 $scope.firstname = data.countData.firstname;
			 $scope.lastname = data.countData.lastname;
			 $scope.userid = data.countData.userid;
			 $scope.birthday = data.countData.birthday;
			 $scope.location = data.countData.location;
			 $scope.contact = data.countData.contact;
		 }
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
	$scope.showFollowers = function(){
		$http({
			 method: "POST",
			 url : '/getMyFollowers',
		 }).success(function(data) {
				 $scope.followers = data;
				 $scope.showFeed = true;
				 $scope.showFollowingList=true;
				 $scope.showFollowersList=false;
				 
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
		};
	$scope.showFollowing = function(){
		$http({
			 method: "POST",
			 url : '/getMyFollowing',
		 }).success(function(data) {
				 $scope.following = data;
				 $scope.showFeed = true;
				 $scope.showFollowersList=true;
				 $scope.showFollowingList=false;
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
		};
	$scope.showTweets=function(){
		console.log("inside showTweets");
		$http({
			 method: "POST",
			 url : '/getProfileTweets',
		 }).success(function(data) {
			 $scope.showFeed = false;
			 $scope.showFollowingList=true
			 $scope.tweetData = data;
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
	
});


profileDetails.controller('ProfileFeedController', function($scope,$http) {
	/*$scope.showFeed = false;*/
/*	$http({
		 method: "POST",
		 url : '/getProfileTweets',
	 }).success(function(data) {
		 $scope.showFeed = false;
		 $scope.data = data;
 }).error(function(error) {
		$scope.unexpected_error = false;
	});*/
	
	
	
	
	
});
