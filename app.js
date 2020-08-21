const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');

mongoose.connect(config.mongodb.url, config.mongodb.options);
let db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.mongodb.url);
});

let models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
let app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Cdonut server listening on port ' + config.port);
});
