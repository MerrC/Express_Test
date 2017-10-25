//Requirements
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var passport = require('passport')
var util = require('util');
var app = express();
var cors = require('cors')

//App Creation
var app = express();

//Database vars
var connection_string = 'mongodb:\/\/rpg_admin:Kitten1@localhost:27017/rpg_go?authSource=rpg_go&authMechanism=SCRAM-SHA-1';
var db = mongojs(connection_string, ['races','import-classes']);
if(db){
  console.log("DB Connected...");
  var races_col = db.collection('races');
  var importclasses_col = db.collection('import-classes');
  var players_col = db.collection('players');  
}
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(cors())

/*
app.configure(function() {
  
             app.use(function(req, res, next) {
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
*/

app.get('/players', function (req, res) {
    //res.header('Access-Control-Allow-Credentials',true);
    //res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept, *');
    console.log("QUERY CONTENT",req.query);
    var p = req.query;
    players_col.find({player_name:p.player_name}).toArray(function(err,players){
        if (err || !players) {
            console.log("err",err);
            res.send("ERROR ON DB CALL");
        }else{
            if(players.length == 0){
                //player does not exist, create them, then send their JSON back
                var userobject = {
                    player_name:p.player_name,
                    pwd:p.player_pwd
                }
                players_col.insert(userobject, function(err){
                    if(err){
                        console.log(err);
                        //return done(null, p);
                        res.json({result: 'error-on insert'});
                    }else{
                        console.log("insert complete");
                        //return done(null, p);
                        res.json({result: '1'});
                    };

                });
            }else{
              //player exists, generate and send their JSON back
              res.json(players[0]);
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