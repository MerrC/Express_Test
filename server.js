//Requirements
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var passport = require('passport')
var util = require('util');
var app = express();

//App Creation
var app = express();



app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000);
var io = require('socket.io').listen(server, function () {
  console.log('Example io listening on port 3000!')
});