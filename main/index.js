const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./routes/cohort.routes.js')(app);  //Add route file here
require('./routes/criteria.routes.js')(app);  //Add route file here

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// app.use(express.json());

// app.get('/', (req, res) => {
// 	res.json({"message": "Welcome to ZeptoBook Product app"});
// 	console.log("beep boop");
	
// });

app.listen(config.serverport);
console.log('Running on port 8000...');
