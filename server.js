//Requirements
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var passport = require('passport')
var util = require('util');
var app = express();

//App Creation
var app = express();

var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/rpg_go';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
assert.equal(null, err);
console.log("Connected correctly to server");

db.close();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000,function() {
  console.log('Started App on 3000');
});
var io = require('socket.io').listen(server, function () {
  console.log('io listening on port 3000!');
});