const express = require("express")
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var Constant = require('../src/shared/constants.js');

// Player class
var p = require('../src/shared/player.js');

// Game class
const Game = require('../src/server/game');
const game = new Game();

/*Web Server*/
var port = 44444  
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("dist"));

io.on('connection', function(socket) {
    socket.on('kbinput', function(input) {
        game.handleKBInput(socket, input);
    });
    socket.on('minput', function(input) {
        game.handleMouseInput(socket, input);
    });
    socket.on('login', function(msg){
        // create new player
        game.addPlayer(socket, msg);
        console.log("FROM: "+ game.players[socket.id].id + " : " + game.players[socket.id].name);
        socket.emit('mapUpdate', JSON.stringify(game.map));
    });
    socket.on('disconnect', function(){ 
        var removedPlayer = game.players[socket.id];
        game.removePlayer(socket);
        if (removedPlayer != null) {
            console.log(removedPlayer.name + " DISCONNECTED");
        }
    });
    
});

setInterval(function() {
    game.updateBullets();
    var update = {
        players: game.players
    }
    io.sockets.emit('update', JSON.stringify(update));
}, 1000/Constant.FPS);

http.listen(port, () => console.log("Example app listening on port " + port + "!"));