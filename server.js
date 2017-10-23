//Requirements
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var passport = require('passport')
var util = require('util');
var app = express();

//App Creation
var app = express();

//Database vars
var connection_string = 'mongodb:\/\/rpg_admin:Kitten1@localhost:27017/rpg_go?authSource=admin&authMechanism=MONGODB-CR';
var db = mongojs(connection_string, ['races','import-classes']);
if(db){
  console.log("DB Connected...");
  var races_col = db.collection('races');
  var importclasses_col = db.collection('import-classes');
}
app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000,function() {
  console.log('Started App on 3000');
});
var io = require('socket.io').listen(server, function () {
  console.log('io listening on port 3000!');
});