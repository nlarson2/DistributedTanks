import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { movements } from './input';
const Constants = require('../shared/constants.js')
//var Player = require('../shared/player.js');
var socket;

export function Login(name) {
    // login new player
    socket = io();
    SetupCallbacks();
    socket.emit('login', name);
    // start a loop to send the server inputs
    setInterval(function() {
        socket.emit('kbinput', movements);
    }, 1000/Constants.FPS);
}

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
}

function processUpdate(update) {
    players = update.players;
    for (var x in players) {
        if (x == socket.id) {
            me = players[x];
        }
    }
}

export function sendMouseInput(event) {
    if (me.barrel_angle != undefined && me.x != undefined && me.y != undefined) {
        socket.emit('minput');
    }
}