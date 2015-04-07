var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

var client = new pg.Client(connectionString);

router.get('/', function(req, res, next) {
	var result;
	
	pg.connect(connectionString, function(err, client, done){
		var query = client.query("DELETE FROM items; ALTER SEQUENCE items_id_seq RESTART WITH 1;");
		
		query.on('end', function() { 
		
			client.end();
			res.send("deleted all items");
		});
		
		// Handle Errors
        if(err) {
          console.log(err);
        }
		
	});
});

module.exports = router;
