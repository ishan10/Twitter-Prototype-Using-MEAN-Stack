var ejs = require("ejs");
var mysql = require('./mysql');

function searchSession(req,res) {
	var searchString = req.body.searchInput;
	
	req.session.username = searchString;
	res.send(req.session.username);
}

function showSearchPage(req,res) {
	res.render('searchResults');
}

function search(req,res){
	searchString = req.session.username;
	console.log("searchString : "+searchString);
	if (searchString.charAt(0)=="@"){
		console.log("inside @@@@@@@@@");
		searchString=searchString.slice(1);
		var searchHandleQuery = "SELECT CONCAT(userprofile.firstname,' ', userprofile.lastname) AS fullname, userprofile.userid FROM twitter.userprofile WHERE userid='"+searchString+"'";
		console.log("searchHandleQuery  "+searchHandleQuery);
		mysql.fetchData(function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					json_responses = {"statusCode" : "searchProfile", "results" : results};
					res.send(json_responses);
				}
			}
	},searchHandleQuery);
		}
	else if (searchString.charAt(0)=="#"){
		console.log("inside ######");
		searchString=searchString.slice(1);
		console.log("inside #" +searchString);
		var searchHashQuery = "SELECT tweet_comments,firstname,lastname,userprofile.userid from userprofile inner join tweet_post on userprofile.userid = tweet_post.userid INNER JOIN hashtable on tweet_post.tweet_id = hashtable.tweet_id WHERE hashvalue = ' "+searchString+"'";
		console.log("searchHashQuery :" +searchHashQuery);
		mysql.fetchData(function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					json_responses = {"statusCode" : "searchHash", "results" : results};
					res.send(json_responses);
				}
			}
	},searchHashQuery);
		
	}
}

exports.search=search;
exports.showSearchPage=showSearchPage;
exports.searchSession = searchSession;