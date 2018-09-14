var fs    = require('fs');
var cluster = require('cluster');

var config = require('./config');
var app = require('./app');

var workers = [];

if (cluster.isMaster) {

  var nconfBroadcast = function(msg) {
    for (var i in workers) {
      var worker = workers[i];
      worker.send(msg);
    }
  }

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i++) {
    const worker = cluster.fork();
    worker.on('message', (msg) => {
      if(msg.cmd === 'nconf') {
        nconfBroadcast(msg);
      }
    });
    
    // Add the worker to an array of known workers
    workers.push(worker);
  }
} else {
  // Bind to a port
  app.listen(3000);
  console.log('Application running!');

  process.on('message', (msg) => {
    config.set(msg.key, msg.value);
  });
}