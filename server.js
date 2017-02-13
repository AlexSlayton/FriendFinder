// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

// create the express server and assign the port
var app = express();
var PORT = 3000;

// sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

// create the connection to the SQL server
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'AlexJenn1',
	database: 'friendFinder'
});

// connect to the server
connection.connect();


var friendList = [

];

// when this route is visited, send the browser to /index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/questions', function(req, res) {
	res.sendFile(path.join(__dirname, "questions.html"));
});

// when /api/tables is visited, display the tables array
app.get('/api/friendList', function(req, res) {
	connection.query('SELECT * FROM friendList', function(err, result) {
		if (err) {
			throw err;
		}
		res.send(result);
	});
});


app.post('/makeReservation', function(req, res) {
	connection.query('SELECT COUNT(unique_id) as count FROM tables', function(err, result) {
		if (err) {
			throw err;
		}
		console.log(req.body);
		if (parseInt(result[0].count) < 5) {
			connection.query('INSERT INTO tables (nameFriend, photo, score, unique_id) VALUES (?, ?, ?, ?)', [req.body.name, req.body.phone, req.body.email, req.body.unique], function(err, insertResult) {
				res.send({friendList: "friendList"});
			});
		}

	});
});


// starts server to begin listening
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});