var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

var client = new pg.Client(connectionString);

router.post('/', function(req, res){
	var size = 0;
	var image ='';

	pg.connect(connectionString, function(err, client, done){
	
		req.on('data', function (data) {
			size += data.length;
			image += data;
			console.log('Got chunk: ' + data.length + ' total: ' + size);
		});

		req.on('end', function () {
			console.log("total size = " + size);
			
			var query = client.query("INSERT INTO items(image) values($1)",[image]);
			query.on('end', function() { client.end(); res.end("Thanks"); });
				
			;
		}); 

		req.on('error', function(e) {
			console.log("ERROR ERROR: " + e.message);
		});

		// Handle Errors
        if(err) {
          console.log(err);
        }
	});
})

module.exports = router;
