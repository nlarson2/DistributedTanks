// some code snippets received from:
// https://github.com/vzhou842/example-.io-game/blob/master/src/client/assets.js

import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { players, me, map } from './networking';

const Constants = require('../shared/constants');
const {PLAYER_WIDTH, PLAYER_HEIGHT } = Constants;

const canvas = document.getElementById('game_canvas');
const context = canvas.getContext('2d');


setCanvasDimensions();

function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// on window resize, debounce guarantees that setCanvasDimensions only executes once
// 40 is the delay in milliseconds
window.addEventListener('resize', debounce(40, setCanvasDimensions));


export function renderGame() {
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderMap();

    renderPlayers();

    renderLeaderboard();

    renderhealth();

    window.requestAnimationFrame(renderGame);
}

function renderMap() {
    
    for (var i = 0; i < map.cols; i++) {
        for (var j = 0; j < map.rows; j++) {
            var tile = map.tiles[i][j];
            var x = i * map.tile_size - me.x;
            var y = j * map.tile_size - me.y;
            if (tile != 0) {
                if (tile == 1) {
                    var image = getAsset('tile.jpg');
                } else if (tile == 2) {
                    var image = getAsset('wall.jpg');
                }
                context.save();
                context.translate(canvas.width/2 + x, canvas.height/2 + y);
                context.drawImage(
                    image,
                    0,
                    0,
                    map.tile_size,
                    map.tile_size,
                    0,
                    0,
                    map.tile_size,
                    map.tile_size
                );
                context.restore();
            }
        }
    }
}

function renderPlayers() {
    for (var i in players) {
        renderBullets(i);
        // draw tank body
        context.save();
        // center each client on themselves and draws the other player relative to them
        context.translate(canvas.width/2 + players[i].x - me.x, canvas.height/2 + players[i].y - me.y);
        context.rotate(players[i].tank_angle);
        // fill is the body, stroke is the body outline
        context.lineWidth = 1;
        context.strokeStyle = "black"
        if(players[i].team == 0)
        context.fillStyle = "green"
        if(players[i].team == 1)
        context.fillStyle = "red"
        context.strokeRect(-PLAYER_WIDTH/2,-PLAYER_HEIGHT/2,PLAYER_WIDTH,PLAYER_HEIGHT);
        context.fillRect(-PLAYER_WIDTH/2,-PLAYER_HEIGHT/2,PLAYER_WIDTH,PLAYER_HEIGHT);
        /*
        var image = getAsset('tank.svg');
        context.drawImage(
            image,
            -image.width/2,
            -image.height/2,
            image.width,
            image.height
        );
        */
        context.restore();

        // draw tank barrel
        context.save();
        // center the barrel on the tank body
        context.translate(canvas.width/2 + players[i].x - me.x, canvas.height/2 + players[i].y - me.y);
        context.rotate(players[i].barrel_angle);
        // fill is the barrel, stroke is the barrel outline
        context.lineWidth = 1;
        context.strokeStyle = "black"
        if(players[i].team == 0)
        context.fillStyle = "green"
        if(players[i].team == 1)
        context.fillStyle = "red"
        context.strokeRect(-PLAYER_WIDTH/8,0,PLAYER_WIDTH/4,-PLAYER_HEIGHT);
        context.fillRect(-PLAYER_WIDTH/8,0,PLAYER_WIDTH/4,-PLAYER_HEIGHT);
        context.restore();
    }
}

function renderBullets(socket) {
    for (var i = 0; i < players[socket].bullets.length; i++) {
        context.save();
        context.translate(canvas.width/2 + players[socket].bullets[i].x - me.x, canvas.height/2 + players[socket].bullets[i].y - me.y);
        context.rotate(players[socket].bullets[i].angle);
        context.lineWidth = 1;
        context.strokeStyle = "black"
        if(players[socket].team == 0)
        context.fillStyle = "green"
        if(players[socket].team == 1)
        context.fillStyle = "red"
        context.strokeRect(-PLAYER_WIDTH/8,0,PLAYER_WIDTH/4,-PLAYER_HEIGHT/4);
        context.fillRect(-PLAYER_WIDTH/8,0,PLAYER_WIDTH/4,-PLAYER_HEIGHT/4);
        context.restore();
    }
}

function renderLeaderboard() {
   
    context.font = "18px Verdana";
    var x_spacing = canvas.width-200;
    var y_spacing = 20;
    var array = [], pid=[];
    var count = 0;
    context.globalAlpha = 0.2;
    context.fillStyle = "black";
    context.fillRect(x_spacing,y_spacing, 180, 250);
    context.restore();
    context.globalAlpha = 1.0; 
   
   for(var i in players) {
        array[count] = players[i].score;
        pid[count++] = i;
    }
    for (let i = 0; i < array.length; i++) {
        let temp = array[i];
        let j;
        let pidTemp = pid[i];
        for (j = i - 1; j >= 0 && array[j] < temp; j--) {
            array[j + 1] = array[j];
            pid[j+1] = pid[j];
    
        }
        array[j + 1] = temp;
        pid[j+1] = pidTemp;
    }
    for(let i = 0; i < array.length;i++) {
        y_spacing+=20;

            if(pid[i] == me.socket_id ) {
                context.fillStyle = "#cf3530";
                context.fillText((i+1)+'-  ' + players[pid[i]].name + '   Pts: '+ array[i] ,x_spacing,y_spacing);
            }
            else {
                context.fillStyle = "white";
                context.fillText((i+1)+'-  ' +  players[pid[i]].name + '   Pts: '+ array[i] ,x_spacing,y_spacing);

            }
    }
}
function renderhealth(){
    var x = canvas.width/6;
    var y = 30;
    var res;
    context.fillStyle = '#000000';
    context.fillRect(x,y,100,y);
    for(var i in players) {
        if(i == me.socket_id) {
            if(players[i].health <= 100 && players[i].health >=76) {
                context.fillStyle = '#18732c';
            }
            if(players[i].health <= 75 && players[i].health >=51) {
                context.fillStyle = '#49d439';
            }
            if(players[i].health <= 50 && players[i].health >=26) {
                context.fillStyle = '#c2b940';
            }
            if(players[i].health <= 25 && players[i].health >=0) {
                context.fillStyle = '#c22017';
            }
          

        res = players[i].health/100.0*98.0;

            context.fillRect(x+1,y+1, res,28);

            context.restore();
        }
    }
}
export function startRendering() {
    window.requestAnimationFrame(renderGame);
}