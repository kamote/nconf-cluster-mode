// Include Express
var express = require('express');
var cluster = require('cluster');


var config = require('./config');

// Create a new Express application
var app = express();

// Add a basic route – index page
app.get('/', function (req, res) {
  res.send({
    message: 'Hello from Worker ' + cluster.worker.id,
    port: config.get('port'),
    salt: config.get('salt'),
    name: config.get('name')
  });
});

app.get('/update', function (req, res) {
  // const value = req.query.value || 8000;
  // const key = req.query.key || 'port';

  Object.keys(req.query).forEach((key) => {
    process.send({ cmd: 'nconf', key: key, value: req.query[key] });
  });

  res.send({
    message: 'Done update ' + cluster.worker.id,
  });
});


module.exports = app;

