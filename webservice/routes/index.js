var express = require('express');
var router = express.Router();

var pg = require('pg');

var connectionString = {
	user: "sykqxpfleazxjc",
	password:"NVvDSAN-om1dIYBlHytStBjipY",
	database:"dbdqtrrgjg7m4p",
	port: 5432,
	host: "ec2-54-163-225-41.compute-1.amazonaws.com",
	ssl:true
}

var client = new pg.Client(connectionString);

/* GET pics listing. */
router.get('/', function(req, res, next) {
	var result = [];
	
	pg.connect(connectionString, function(err, client, done){
		var query = client.query("SELECT * FROM items");
	
		query.on("row", function (row) {
			result.push(row);
		});
		
		query.on('end', function() { 
		
			client.end();
			var data = {'items' : result};
			res.render("index.html", data)
		});
		
		// Handle Errors
        if(err) {
          console.log(err);
        }
		
	});
});

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
			query.on('end', function() { client.end(); res.end("Thanks");});
				
			
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
