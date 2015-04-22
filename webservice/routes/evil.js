var express = require('express');
var router = express.Router();

var pg = require('pg');

//var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

var connectionString = {
	user: "sykqxpfleazxjc",
	password:"NVvDSAN-om1dIYBlHytStBjipY",
	database:"dbdqtrrgjg7m4p",
	port: 5432,
	host: "ec2-54-163-225-41.compute-1.amazonaws.com",
	ssl:true
}

var client = new pg.Client(connectionString);

router.get('/', function(req, res) {
	var result;
	
	pg.connect(connectionString, function(err, client, done){
		var query = client.query("SELECT sum(case when evil then 1 else 0 end) * 1.0 / count(*) * 1.0 as evil_ratio FROM items");
		
		query.on("row", function (row) {
			result = row
		});
		
		query.on('end', function() { 
		
			client.end();
			res.send(result.evil_ratio)
		});
		
		// Handle Errors
        if(err) {
          console.log(err);
        }
		
	});
});

module.exports = router;
