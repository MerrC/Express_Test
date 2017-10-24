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
var connection_string = 'mongodb:\/\/rpg_admin:Kitten1@localhost:27017/rpg_go?authSource=rpg_go&authMechanism=SCRAM-SHA-1';
var db = mongojs(connection_string, ['races','import-classes']);
if(db){
  console.log("DB Connected...");
  var races_col = db.collection('races');
  var importclasses_col = db.collection('import-classes');
}
app.get('/', function (req, res) {
  res.send('Hello World!')
})

self.app.configure(function() {
  
             self.app.use(function(req, res, next) {
                 res.header('Access-Control-Allow-Credentials',true);
                 res.header('Access-Control-Allow-Origin', '*');
                 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept, *');


                 if ('OPTIONS' === req.method) {
                  res.send(200);
              }
              else {
                  next();
              };
          });
      });

app.get('/dbquery', function (req, res) {
  console.log("QUERY CONTENT",req.query);
  importclasses_col.find({name: req.query.pc_class}).toArray(function(err,races){
      if (err || !races) {
          console.log("err",err);
          res.send("ERROR ON DB CALL");
      }else{
          if(races.length >0){
              data = races[0];
              res.json(data);
          }else{
            res.json({result: 'error-no races'});
          }
      }
  });
})

var server = app.listen(3000,function() {
  console.log('Started App on 3000');
});
var io = require('socket.io').listen(server, function () {
  console.log('io listening on port 3000!');
});