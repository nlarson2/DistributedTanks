const express = require("express")
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var Constant = require('../shared/constants.js');

/*
// Player class
var p = require('../shared/player.js');

// Game class
const Game = require('./game');
const game = new Game();
*/

const ClusterManager = require('./ClusterManager');
var cm = new ClusterManager();

/*Web Server*/
var port = 44444
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("dist"));

io.on('connection', function(socket) {

    var currentServer = '-1';
    var playerID = socket.id;
    
    socket.on('kbinput', function(input) {
        //game.handleKBInput(socket, input);
        cm.handleKBInput(currentServer, playerID, input)
    });
    socket.on('minput', function() {
        //game.handleMouseInput(socket, input);
        cm.handleMouseInput(currentServer, playerID);
    });
    socket.on('login', function(msg){
        // create new player
        //game.addPlayer(socket, msg);
        //console.log("FROM: "+ game.players[socket.id].id + " : " + game.players[socket.id].name);
        //socket.emit('mapUpdate', JSON.stringify(game.map));
        currentServer = cm.allocatePlayer(socket, msg);
    });
    socket.on('logout', function(msg){
        //handle logout
            //code
        currentServer = '-1'
    });
    socket.on('disconnect', function(){
        /*
        var removedPlayer = game.players[socket.id];
        game.removePlayer(socket);
        if (removedPlayer != null) {
            console.log(removedPlayer.name + " DISCONNECTED");
        }
        */
        cm.removePlayer(currentServer, playerID);
    });
    
});



http.listen(port, () => console.log("Example app listening on port " + port + "!"));