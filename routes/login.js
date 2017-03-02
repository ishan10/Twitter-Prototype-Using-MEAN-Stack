var mysql = require('./mysql');
var crypto = require('crypto');

function checkLogin(req,res) {
	var password, email;
	password = req.body.password;
	//password = crypto.createHash("sha1").update(password).digest("HEX");
	email = req.body.email;
	
	var json_responses;
	
	var getUser="select * from userprofile where email='"+email+"' and password='"+password+"';"
	console.log("Query for Login is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else if (results.length > 0){
			var rows = results;
			var jsonString = JSON.stringify(results);
			var jsonParse = JSON.parse(jsonString);
			console.log("Results: "+(rows[0].userid));
				req.session.username = rows[0].userid;
				console.log("Session initialized for '"+req.session.username+"' user");
				json_responses = {"statusCode" : "validLogin"};
				res.send(json_responses);
		} else {
			json_responses = {"statusCode" : "invalidLogin"};
			res.send(json_responses);
		}
	},getUser);
	
}

function signOut(req,res){
	req.session.destroy();
	json_responses = {"statusCode" : "sessionTerminated"};
	res.send(json_responses);
}
exports.signOut=signOut;
exports.checkLogin=checkLogin;
	
