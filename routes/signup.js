var ejs = require("ejs");
var mysql = require('./mysql');

function fetchtweets(req,res){
	mysql.fetchtweets(function(err,results){
		if(err){
			console.log("Error");
		}else{
			ejs.renderFile("./views/success.ejs",{data:results}, function(err, result){
				//res.status(200).json(results);
				res.end(result);
				console.log("fetched");	
			});
		}
	},"");
}

function signupHome(req,res) {
	res.render('signUpForm');
}

function checkUser(req, res) {
	// check user already exists
	var firstname, lastname,email, password, userid, birthday,location,contact;
	firstname = req.body.firstname;
	lastname = req.body.lastname;
	email = req.body.email;
	password = req.body.password;
	userid = req.body.userid;
	birthday = req.body.birthday;
	location = req.body.location;
	contact = req.body.contact;
	var json_responses;
	var getUser="select * from userprofile where userid='"+userid+"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("User Exists");
				json_responses = {"statusCode" : "userExists"};
				res.send(json_responses);
			}
			else {    
				
				
		//var userid = req.param("userid");		
	//	var addUser = "INSERT INTO userprofile (userid,password,firstname,lastname,email) values ('"+req.param("userid")+"','"+req.param("password")+"','"+req.param("firstname")+"','"+req.param("lastname")+"','"+req.param("email")+"')";
				var addUser = "INSERT INTO userprofile (userid,password,firstname,lastname,email,birthday,location,contact) values ('"+userid+"','"+password+"','"+firstname+"','"+lastname+"','"+email+"','"+birthday+"','"+location+"','"+contact+"')";
				console.log(" adduser Query is:"+addUser);
		
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else{
				console.log("user created");
				json_responses = {"statusCode" : "userCreated"};
				res.send(json_responses);
		}	
		},addUser);
			} 
			}
	},getUser);
}


function success(req,res) {

	ejs.renderFile('./views/success.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
exports.success=success;
exports.fetchtweets=fetchtweets;
exports.signupHome=signupHome;
exports.checkUser=checkUser;