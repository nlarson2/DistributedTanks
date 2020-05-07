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
cm.StartServer(1)
cm.StartServer(2)
/*Web Server*/
var port = 44444
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("dist"));

io.on('connection', function(socket) {

    var currentServer = '-1';
    var playerID = socket.id;
    var name;
    socket.on('kbinput', function(input) {
        //game.handleKBInput(socket, input);
        try{
        cm.handleKBInput(currentServer, playerID, input)
        } catch(error){}
    });
    socket.on('minput', function() {
        //game.handleMouseInput(socket, input);
        try{
        cm.handleMouseInput(currentServer, playerID);
        } catch(error){}
    });
    socket.on('login', function(msg){
        // create new player
        //game.addPlayer(socket, msg);
        //console.log("FROM: "+ game.players[socket.id].id + " : " + game.players[socket.id].name);
        //socket.emit('mapUpdate', JSON.stringify(game.map));
        try{
       // console.log(msg);
        name = msg;
        ioAdmin.emit("currentState", cm.gatherInfo());
        socket.emit("currentState", cm.gatherInfo());
        } catch(error){}
    });
    socket.on('logout', function(msg){
        //handle logout
        //code
        try{
        ioAdmin.emit("currentState", cm.gatherInfo())
        currentServer = '-1'
        } catch(error){}
    });
    socket.on('joinServer', function(msg){
        try{
        //console.log(msg)
        currentServer = cm.allocatePlayer(socket, name, msg);
        currentServer = msg
        socket.emit("joinGameSuccess")
        } catch(error){}
    });
    socket.on('pullServers', function() {
        try{
        //console.log("msg recv");
        socket.emit("currentState", cm.gatherInfo())
        } catch(error){}
    });
    socket.on('disconnect', function(){
        /*
        var removedPlayer = game.players[socket.id];
        game.removePlayer(socket);
        if (removedPlayer != null) {
            console.log(removedPlayer.name + " DISCONNECTED");
        }
        */
        try{
        if(currentServer > -1) {
            cm.removePlayer(currentServer, playerID);
            ioAdmin.emit("currentState", cm.gatherInfo())
        }
        } catch(error){}
    });


    
});
http.listen(port, () => console.log("Example app listening on port " + port + "!"));


var httpAdmin = require('http').createServer();
var ioAdmin = require('socket.io')(httpAdmin)


ioAdmin.on("connection", (socket) => {


    socket.on("pullServers", (msg) => {
        socket.emit("currentState", cm.gatherInfo())
    })
    socket.on("startServer", (msg) => {
        cm.StartServer(msg.value)//msg.value)
        socket.emit("currentState", cm.gatherInfo())
    })
    socket.on("stopServer", (msg) => {
        cm.CloseServer(msg.value)
        socket.emit("currentState", cm.gatherInfo())
    })
    socket.on("disconnect", () => {
    })
})

httpAdmin.listen(55555, () => console.log("Admin listening"));