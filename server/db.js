const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const util = require("util");

// open the MySQL connection
function makeDb( ) {
	const connection = mysql.createConnection({
	  host: dbConfig.HOST,
	  user: dbConfig.USER,
	  password: dbConfig.PASSWORD,
	  database: dbConfig.DB,
	  insecureAuth : true
	});

	connection.connect(error => {
	  if (error) throw error;
	  console.log("Successfully connected to the database.");
	});


  return {
    query( sql, args ) {
		console.log("SQL: "+sql);
		return util.promisify( connection.query ).call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}


module.exports = makeDb();