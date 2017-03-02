var ejs=require("ejs");
var mysql = require('mysql');

pool = null;
last = 0;
function createConnectionPool(noOfConnections){

    pool = [];
    for(var i=0; i < noOfConnections; ++i)
    {
        pool.push(mysql.createConnection({
        	connectionLimit : 1000,
            host     : 'localhost',
            user     : 'root',
            password : 'ishan',
            dateStrings : true,
            database : 'twitter',
            port    : 3306
        }));
    }
}

function getConnectionFromConnectionPool ()
{
    if(!pool)
    {
        initializeConnection();
    }
    var connection = pool[last];
    last++;
    if (last == pool.length)
        last = 0;
    return connection;
}

function end(connection)
{
    pool.push(connection);
}


function initializeConnection(){
    createConnectionPool(100);
}


exports.getConnectionFromConnectionPool = getConnectionFromConnectionPool;
exports.end = end;