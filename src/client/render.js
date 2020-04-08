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
        context.fillStyle = "green"
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
        context.fillStyle = "green"
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
        context.fillStyle = "white"
        context.strokeRect(-PLAYER_WIDTH/8,0,PLAYER_WIDTH/4,-PLAYER_HEIGHT/4);
        context.fillRect(-PLAYER_WIDTH/8,0,PLAYER_WIDTH/4,-PLAYER_HEIGHT/4);
        context.restore();
    }
}

function renderLeaderboard() {
    context.font = "20px Verdana";
    var x_spacing = canvas.width-300;
    var y_spacing = 20;
    context.fillText("Players:", x_spacing, y_spacing);
    for (var x in players) {
        y_spacing+=20;
        if (x == me.socket_id) {
            context.fillText('*' + players[x].name + '*', x_spacing, y_spacing);
        } else {
            context.fillText(players[x].name, x_spacing, y_spacing);
        }
    }
}

export function startRendering() {
    window.requestAnimationFrame(renderGame);
}