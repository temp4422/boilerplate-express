let express = require('express');
let app = express();
let dotenv = require('dotenv').config()
let bodyParser = require('body-parser')

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}));

// Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

// Implement a Root-Level Request Logger Middleware
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve an HTML File
app.get('/', function(req, res) {
  // res.send('Hello Express');
    res.sendFile(__dirname + '/views/index.html');
})

// Use the .env File
// Serve JSON on a Specific Route
app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
})

// Chain Middleware to Create a Time Server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString()
  console.log(req.time)
  next();
}, function(req, res) {
  res.send({"time": req.time});
})

//Get Route Parameter Input from the Client
app.get('/:word/echo', function(req, res, next) {
  console.log(req.params.word)
  next()
}, function(req, res){
  res.send({"echo": req.params.word})
})

// Get Query Parameter Input from the Client
app.route('/name')
.get(function(req, res, next) {
  // console.log(req.query)
  next()
}, function(req, res){
  res.send({"name": `${req.query.first} ${req.query.last}`})
})
// Get Data from POST Requests body with html form action
.post(function(req, res, next) {
  console.log(req.body.first, req.body.last)
  next()
}, function(req, res){
  res.send({"name": `${req.body.first} ${req.body.last}`})
})


 module.exports = app;
