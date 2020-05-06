import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { movements, startCapturingInput } from './input';
const Constants = require('../shared/constants.js')
//var Player = require('../shared/player.js');
var socket;
var StartGame;
export function Login(name, gameStart) {
    // login new player
    socket = io();
    console.log("CONNCTED")
    StartGame = gameStart;
    socket.emit('login', name);
    
    SetupCallbacks();
    
}

export var teams = {}
export var players = {};
export var me = {};
export var map = {};
var once = false;
function SetupCallbacks() {
    socket.on(Constants.MSG_TYPES.GAME_UPDATE , (msg) => {
        processUpdate(JSON.parse(msg));
    });
    socket.on(Constants.MSG_TYPES.GAME_OVER, (msg) => {
        console.log("YOU DEAD")
    });
    socket.on('mapUpdate', (msg) => {
        map = JSON.parse(msg);
    });
    
    socket.on('joinGameSuccess', () => {
        // start a loop to send the server inputs
        setInterval(function() {
            socket.emit('kbinput', movements);
        }, 1000/Constants.FPS);
        StartGame()
    })
    socket.on('currentState', (msg) => {

        console.log(msg)
        var list = document.getElementById("serverList");
        list.innerHTML = ""
        var newHTML= ""
        for(var state in msg) {
            var gametype;
            console.log("HERE");
            console.log(msg[state].gametype);
            if(msg[state].gametype == 1){
                gametype = "Free For All"
            } else {
                gametype = "Team Deathmatch"
            }
            newHTML += "<li style='list-style-type: none;'>"
            newHTML += "<input type='submit' id='"+ msg[state].id +"' class = 'btn btn-danger btn-block join_button' name = \"";
            newHTML += msg[state].id +"\" onclick = 'javascript:document.getElementById(\""+ msg[state].id +"\").value=\"0\"' value = 'Join Server " + msg[state].id +"&nbsp - "
            newHTML += gametype +" - &nbsp Current Player Count: ";
            newHTML += msg[state].playerCount + "'>"
            newHTML += "</li>"
        }
        list.innerHTML = newHTML;
        
    });
}

function processUpdate(update) {
    players = update.players;
    teams = update.teams;
    for (var x in players) {
        if (x == socket.id) {
            me = players[x];
        }
    }
}


export function sendMouseInput(event) {
    var playerInfo = {
        x: me.x + Constants.PLAYER_HEIGHT * Math.sin(me.barrel_angle),
        y: me.y - Constants.PLAYER_HEIGHT * Math.cos(me.barrel_angle),
        angle: me.barrel_angle
    }
    if (playerInfo.angle != undefined && playerInfo.x != undefined && playerInfo.y != undefined) {
        socket.emit('minput', playerInfo);
    }
}

export function JoinServer(msg) {
    //alert("TYRING TO JOIN")
    socket.emit('joinServer', msg)
}

export function Refresh(event) {
    //alert("HERE")
    socket.emit('pullServers');
}