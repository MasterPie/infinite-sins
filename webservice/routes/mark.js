var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

var client = new pg.Client(connectionString);

router.post('/', function(req, res) {
	var item_id = req.body.id;
	
	pg.connect(connectionString, function(err, client, done){
		var query = client.query("UPDATE items SET (evil) = (true) WHERE id = $1", [item_id]);
		
		query.on('end', function() { 
		
			client.end();
			res.send("marked as evil.");
		});
		
		// Handle Errors
        if(err) {
          console.log(err);
        }
		
	});
});

module.exports = router;
