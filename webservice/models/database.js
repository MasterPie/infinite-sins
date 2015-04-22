var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'pg://postgres:Kaoken@localhost:5432/infinitesins';

//var connectionString = process.env.DATABASE_URL || 'postgres://sykqxpfleazxjc:NVvDSAN-om1dIYBlHytStBjipY@ec2-54-163-225-41.compute-1.amazonaws.com:5432/dbdqtrrgjg7m4p';

var connectionString = {
	user: "sykqxpfleazxjc",
	password:"NVvDSAN-om1dIYBlHytStBjipY",
	database:"dbdqtrrgjg7m4p",
	port: 5432,
	host: "ec2-54-163-225-41.compute-1.amazonaws.com",
	ssl:true
}

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, image bytea not null, evil boolean DEFAULT false)');

query.on('end', function() { 
	client.end(); 
});