var ejs = require("ejs");
var mysql = require('./mysql');

function showHome(req,res) {
	res.render('home');
}

function twitterHome(req,res) {
	res.render('twitterHome');
	
}

function showDashboard(req,res) {
	var userDetailsQuery = "select followingcount,followerscount from twitter.userprofile where userid='"+req.session.username+"'";
	console.log(userDetailsQuery);
	
	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				var myFollowers = rows[0].followerscount;
				var meFollowing = rows[0].followingcount;
				var data ={"myFollowers" : myFollowers , "meFollowing" : meFollowing};
				console.log("home js myfollowers"+data.myFollowers);
				console.log("Following-follower received");
				json_responses = {"statusCode" : "profileData", "countData" : data};
				res.send(json_responses);
			}
		}
},userDetailsQuery);

}

function getFeed(req,res) {
	//var tweetFeedQuery = "SELECT userid,tweet_comments FROM tweet_post where userid IN (select followingid from followData where userid='"+req.session.username+"') " +"or userid='"+req.session.username+"'"+" order by date_added desc";
	var tweetFeedQuery ="SELECT CONCAT(usertable.firstname, ' ', usertable.lastname) AS fullname, tweets.userid, tweets.tweet_comments, tweets.retweet_user FROM userprofile usertable inner join tweet_post tweets on usertable.userid=tweets.userid where tweets.userid IN (select followingid from followData where userid='"+req.session.username+"') or tweets.userid='"+req.session.username+"' order by date_added desc";
	console.log("tweetFeedQuery "+tweetFeedQuery);
	
	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				res.send(results);
			}
		}
},tweetFeedQuery);

}
function createTweet(req,res) {
	var tweet;
	tweet = req.body.tweet;
	
	var status = 0;
    var pos = tweet.toString().indexOf("#");
    if(pos != -1) {
        var array = tweet.toString().split("#");
        for (i in array) {
            if ((array[i].charAt(0) != " ") && (array[i].charAt(0)!= "")) {
                status = 1;
            }
        }
    }

	console.log("tweet in node "+tweet);
	var insertTweetQuery = "INSERT INTO tweet_post(userid, tweet_comments, date_added) VALUES ('"+req.session.username+"','"+tweet+"',NOW())";
	console.log("tweet insert"+insertTweetQuery);
	//var getLastInsertedTweet = "select max(tweet_id) as max from tweet_post";
	
	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			for (i in array) {
				if (i!= 0)
                {
                    puthash(array[i]);
                }
                }
			
			
		console.log("tweet inserted");
		json_responses = {"statusCode" : "tweeted"};
		res.send(json_responses);
		}
},insertTweetQuery);
	

	function puthash(array)
	{
	  var gettweetid = "select max(tweet_id) as max from tweet_post;"
	    mysql.fetchData(function(err,result) {
	        if (err)
	        {
	            throw err;
	        }

	        else
	        {
	           // console.log("the last id inserted is " + array);
	            if ((array != " ") && (array != "")) {
	                var firstval = array.split(" ");
	                if ((firstval[0].charAt(0) != " ") && (firstval[0].charAt(0) != ""))
	                {
	                    inserthash(result[0].max, firstval[0]);
	                }
	            }
	        }
	    },gettweetid);
	}

	function inserthash(tweetid,hashval)
	{
	    var puthashval = "insert into hashtable(hashvalue,tweet_id) values (' " + hashval + "'," + tweetid + ");"
	   /* console.log(puthashval);*/
	    mysql.fetchData(function(err,result) {
	        if (err)
	        {
	            throw err;
	        }

	        else
	        {
	          //  console.log("SUCCESS IN HASH INSERT");

	        }
	    },puthashval);
	}
	
	


}
function showProfile(req,res){
	console.log("Inside ShowProfile");
	res.render("successProfile");
}

function getProfileDetails(req,res){
	var userProfileQuery = "select firstname,lastname,userid,birthday,location,contact from twitter.userprofile where userid='"+req.session.username+"'";
	console.log("ProfilePage User Query"+userProfileQuery);
	
	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				var firstname = rows[0].firstname;
				var lastname = rows[0].lastname;
				var userid = rows[0].userid;
				var birthday = rows[0].birthday;
				var location = rows[0].location;
				var contact = rows[0].contact;
				var data ={"firstname" : firstname , "lastname" : lastname , "userid" : userid, "birthday" : birthday, "location" : location, "contact" : contact};
				console.log("prfile page firstname"+data.firstname);
				console.log("profile data received");
				json_responses = {"statusCode" : "profilePageData", "countData" : data};
				res.send(json_responses);
			}
		}
},userProfileQuery);	

}

function getProfileTweets(req,res) {
	//var tweetFeedQuery = "SELECT userid,tweet_comments FROM tweet_post where userid IN (select followingid from followData where userid='"+req.session.username+"') " +"or userid='"+req.session.username+"'"+" order by date_added desc";
	//var profileTweetsQuery ="SELECT CONCAT(usertable.firstname, ' ', usertable.lastname) AS fullname, userid, tweets.tweet_comments FROM userprofile usertable where tweets.userid='ishan' order by date_added desc";
	var profileTweetsQuery ="SELECT CONCAT(usertable.firstname,	' ', usertable.lastname) AS fullname, tweets.userid,tweets.tweet_comments FROM userprofile usertable inner join tweet_post tweets on usertable.userid=tweets.userid where tweets.userid='"+req.session.username+"' order by date_added desc";
	console.log("profileTweetsQuery "+profileTweetsQuery);
	
	mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				res.send(results);
			}
		}
},profileTweetsQuery);

}

function getMyFollowing(req,res){
	var myFollowingQuery = "SELECT CONCAT(userprofile.firstname,' ', userprofile.lastname) AS fullname, userprofile.userid FROM twitter.userprofile inner join twitter.followdata ON userprofile.userid = followdata.followingid where followdata.userid='"+req.session.username+"'";
	console.log("myfollowing query "+myFollowingQuery);
		mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				res.send(results);
			}
		}
},myFollowingQuery);
	
}

function getMyFollowers(req,res){
	var myFollowersQuery = "SELECT CONCAT(userprofile.firstname,' ', userprofile.lastname) AS fullname, userprofile.userid FROM twitter.userprofile inner join twitter.followdata ON userprofile.userid = followdata.followerid where followdata.userid='"+req.session.username+"'";
	console.log("myFollowers query "+myFollowersQuery);
		mysql.fetchData(function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				res.send(results);
			}
		}
},myFollowersQuery);
	
}


function reTweet(req,res){
	var userid = req.body.userid;
	var tweet =  req.body.retweet;
	//var reTweet = "UPDATE twitter.tweet_post SET retweet_user='"+req.session.username+"' WHERE tweet_comments='"+tweet+"' AND userid='"+userid+"'";
	var reTweet = "INSERT INTO tweet_post(userid, tweet_comments, date_added,retweet_user) VALUES ('"+req.session.username+"','"+tweet+"',NOW(),'"+userid+"')";
	console.log("reTweet query "+reTweet);
	
	mysql.fetchData(function(err,results){
	
	if(err){
		throw err;
	}
	else 
	{
		console.log("tweet inserted");
		json_responses = {"statusCode" : "retweeted"};
		res.send(json_responses);
	}
	
	
},reTweet);
	
}

function showUserProfile(req,res){
	req.session.username = req.body.userid;
	res.send(req.session.username);
}


exports.showUserProfile=showUserProfile;
exports.reTweet=reTweet;
exports.getMyFollowers=getMyFollowers;
exports.getMyFollowing=getMyFollowing;
exports.getProfileTweets=getProfileTweets;
exports.getProfileDetails=getProfileDetails;
exports.showProfile=showProfile;
exports.createTweet=createTweet;
exports.getFeed=getFeed;
exports.showDashboard=showDashboard;
exports.showHome=showHome;
exports.twitterHome=twitterHome;