var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, image bytea not null, evil boolean DEFAULT false)');

query.on('end', function() { 
	client.end(); 
});