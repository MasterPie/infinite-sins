var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

var client = new pg.Client(connectionString);

/* GET users listing. */
router.get('/', function(req, res, next) {
	var result = [];
	
	pg.connect(connectionString, function(err, client, done){
		var query = client.query("SELECT * FROM items");
	
		query.on("row", function (row) {
			result.push(row);
		});
		
		query.on('end', function() { 
		
			client.end();
			
			//img_html = '<img alt="Embedded Image" src="data:image/png;base64,' + result.image + '"/>';
			//var sf = result.image;//.image
			//var image_data = sf[0]
			//console.log(image_data)
			//console.log(JSON.parse(sf).type)
			var data = {'items' : result};
			res.render("test.html", data)
			//return res.send(img_html)
			//return res.json(sf);
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
