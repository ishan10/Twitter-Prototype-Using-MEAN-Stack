
var profileDetailsHome = angular.module('profileDetailsHome', []);

/*profileDetailsHome.factory('myService', function() {
	var myService ={userid:''};
	return myService;
});*/

profileDetailsHome.controller('HomeProfileController', function($scope, $http) {
	console.log("inside HomeProfileController");
	$http({
		 method: "POST",
		 url : '/dashboards',
	 }).success(function(data) {
		 if(data.statusCode=="profileData"){
			 console.log("followers "+data.myFollowers);
			 $scope.followers = data.countData.myFollowers;
			 $scope.following = data.countData.meFollowing;
		 }
		 else if (data.statusCode == "invalidLogin"){
			 $scope.existingUserName = false;
		 } 
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
	
});

profileDetailsHome.controller('TweetController', function($scope, $http) {
	//console.log('session value', $cookieStore.get('session'));
	$http({
		 method: "POST",
		 url : '/getFeed',
	 }).success(function(data) {
		// alert(data);
		 
			 $scope.data = data;
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
	$scope.tweet = function(){
		 $http({
			 method: "POST",
			 url : '/createTweet',
			 data: {
				 "tweet" : $scope.tweetValue
			 }
		 }).success(function(data) {
			 if(data.statusCode=="tweeted"){
				 window.location.assign("/twitterHome"); 
			 }
			  
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	 };

	 
	 $scope.profile = function(userid){
		 $http({
			 method: "POST",
			 url : '/showUserProfile',
			 data: {
				 "userid"  : userid
			 }
		 }).success(function(data) {
			  window.location.assign('showProfile');
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	 };
	 $scope.retweet = function(tweetContent,userid){
		 console.log("retweet content "+tweetContent);
		 console.log("retweet userid "+userid);
		 $http({
			 method: "POST",
			 url : '/reTweet',
			 data: {
				 "retweet" : tweetContent,
				 "userid"  : userid
			 }
		 }).success(function(data) {
			 if(data.statusCode=="retweeted"){
				 window.location.assign("/twitterHome"); 
			 }
			  
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	 };
	 $scope.showRetweetButton = function(retweetuser){
		if(retweetuser=="" || retweetuser==null){
			return true;
		}
		else{
			return false;
		}
	 };
});


profileDetailsHome.controller("SearchController", function($scope,$http) {
	$scope.searchSession = function (searchInput) {
		console.log("Inside SearchController");
		$http({
			 method: "POST",
			 url : '/searchSession',
			 data: {
				 "searchInput" : searchInput
			 }
		 }).success(function(data){
			 window.location.assign("/showSearchPage");
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	}
	$scope.signOut = function (searchInput) {
		console.log("Inside signout");
		$http({
			 method: "POST",
			 url : '/signOut'
		 }).success(function(data){
			 if(data.statusCode=="sessionTerminated"){
				 window.location.assign("/home"); 
			 }
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	}
	
	
	
});