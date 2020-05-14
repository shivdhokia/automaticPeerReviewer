const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const GoogleAuth = require('simple-google-openid');


// client ID here
app.use(GoogleAuth("1089772549494-l0ufh0njlpaa30ap8lnqtgp9jld63npj.apps.googleusercontent.com"));

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// return 'Not authorized' if we don't have a user
app.use('/api', GoogleAuth.guardMiddleware());
 
app.get('/api/hello', (req, res) => {
  
  res.send('Hello ' + (req.user.displayName || 'user without a name') + '!');
 
  console.log('successful authenticated request by ' + req.user.emails[0].value);
});

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

app.get('*', (req, res) => {
  
    res.sendFile(__dirname+'/public/index.html');
  });

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

app.listen(config.serverport);
console.log('Running on port 8000...');
