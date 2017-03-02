var ejs= require('ejs');
var mysql = require('mysql');
var connectionPool = require('./connectionPool');

//Put your mysql configuration settings - user, password, database and port
/*function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'ishan',
	    database : 'twitter',
	    port	 : 3306
	});
	return connection;
}*/


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=connectionPool.getConnectionFromConnectionPool();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			//console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	//console.log("\nConnection closed..");
	connectionPool.end(connection);
}	

exports.fetchData=fetchData;
//exports.fetchtweets=fetchtweets;