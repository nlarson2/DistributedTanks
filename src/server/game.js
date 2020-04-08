// https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
//https://github.com/mozdevs/gamedev-js-tiles/blob/gh-pages/square/scroll.js

const Player = require('./../shared/player');
const Bullet = require('./../shared/bullet');
var Constants = require('../shared/constants.js');

module.exports = class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.map = {
            cols: 30,
            rows: 30,
            tile_size: 64,
            tiles: [
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,2,2,2,2,2,1,1,1,1,2,2,2,2,2,1,1,1,2,1,1,1,2],
                [2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,2,1,1,1,2,2,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2],
                [2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
                [2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
                [2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
                [2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
                [2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,2,1,1,1,2,2,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2],
                [2,1,1,1,2,1,1,1,2,2,2,2,2,1,1,1,1,2,2,2,2,2,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
            ]
        };
    }
    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;
        this.players[socket.id] = new Player(socket.id, username);
        // player might spawn inside the wall, so just choose another spawn if it happens
        while (this.checkPlayerWallCollisions(socket.id)) {
            this.players[socket.id].posx = 64*30 * (0.25 + Math.random() * 0.5);
            this.players[socket.id].posy = 64*30 * (0.25 + Math.random() * 0.5);
        }
    }

    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    handleKBInput(socket, inputs) {
        this.players[socket.id].barrelAngle = inputs.mouseAngle;
        if (inputs.right) {
            var angle = this.players[socket.id].tankAngle + Constants.PLAYER_TURN_SPEED * Math.PI/180;
            if (angle > Constants.MAX_ANGLE) {
                angle = Constants.MIN_ANGLE;
            }
            if (angle < Constants.MIN_ANGLE) {
                angle = Constants.MAX_ANGLE;
            }
            this.players[socket.id].tankAngle = angle;
        }
        if (inputs.left) {
            var angle = this.players[socket.id].tankAngle - Constants.PLAYER_TURN_SPEED * Math.PI/180;
            if (angle > Constants.MAX_ANGLE) {
                angle = Constants.MIN_ANGLE;
            }
            if (angle < Constants.MIN_ANGLE) {
                angle = Constants.MAX_ANGLE;
            }
            this.players[socket.id].tankAngle = angle;
        }
        if (inputs.forward) {
            var oldPosx = this.players[socket.id].posx;
            this.players[socket.id].posx += Constants.PLAYER_SPEED * Math.sin(this.players[socket.id].tankAngle);
            if(this.checkPlayerWallCollisions(socket.id)) {
                this.players[socket.id].posx = oldPosx;
            }
            var oldPosy = this.players[socket.id].posy;
            this.players[socket.id].posy -= Constants.PLAYER_SPEED * Math.cos(this.players[socket.id].tankAngle);
            if(this.checkPlayerWallCollisions(socket.id)) {
                this.players[socket.id].posy = oldPosy;
            }
        }
        if (inputs.backward) {
            var oldPosx = this.players[socket.id].posx;
            this.players[socket.id].posx -= Constants.PLAYER_SPEED * Math.sin(this.players[socket.id].tankAngle);
            if(this.checkPlayerWallCollisions(socket.id)) {
                this.players[socket.id].posx = oldPosx;
            }
            var oldPosy = this.players[socket.id].posy;
            this.players[socket.id].posy += Constants.PLAYER_SPEED * Math.cos(this.players[socket.id].tankAngle);
            if(this.checkPlayerWallCollisions(socket.id)) {
                this.players[socket.id].posy = oldPosy;
            }
        }
    }

    handleMouseInput(socket, inputs) {
        this.players[socket.id].bullets.push(new Bullet(inputs.angle, inputs.x, inputs.y, Date.now()));
    }
    /*
    // unoptimized wall collisions: checks all tiles in the map
    checkWallCollisions(socketid) {
        for (var i = 0; i < this.map.cols; i++) {
            for (var j = 0; j < this.map.rows; j++) {
                if (this.map.tiles[i][j] == 2) {
                    // gets the top left coords of the current tile
                    var x = i * this.map.tile_size;
                    var y = j * this.map.tile_size;
                    // if there is a collision, reset the player position to what it was before inputs
                    if (this.players[socketid].posx < x + this.map.tile_size &&
                        this.players[socketid].posx > x &&
                        this.players[socketid].posy < y + this.map.tile_size &&
                        this.players[socketid].posy > y) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    */

    // optimized wall collisions: checks only the tile the player is on
    checkPlayerWallCollisions(socketid) {
        var x = Math.floor(this.players[socketid].posx/this.map.tile_size);
        var y = Math.floor(this.players[socketid].posy/this.map.tile_size);
        if (this.map.tiles[x][y] == 2) {
            return true;
        }
        return false;
    }

    checkBulletWallCollisions(bullet) {
        var x = Math.floor(bullet.posx/this.map.tile_size);
        var y = Math.floor(bullet.posy/this.map.tile_size);

        if (this.map.tiles[x][y] == 2) {
            return true;
        }
        return false;
    }

    updateBullets() {
        for (var i in this.players) {
            var arr = []
            for (var j = 0; j < this.players[i].bullets.length; j++) {
                // removes bullets that live too long
                if (Math.floor((Date.now() - this.players[i].bullets[j].spawnTime)/1000) >= Constants.BULLET_LIFETIME) {
                    // skip this loop iteration causing this bullet to be destroyed
                    continue
                }
                var oldPosx = this.players[i].bullets[j].posx;
                this.players[i].bullets[j].posx += Constants.BULLET_SPEED * Math.sin(this.players[i].bullets[j].angle);
                if (this.checkBulletWallCollisions(this.players[i].bullets[j])) {
                    this.players[i].bullets[j].posx = oldPosx;
                    var degrees = this.players[i].bullets[j].angle * 180/Math.PI;
                    // removes the bullets whose angles the meet or exceed the critical angle
                    if (Math.abs(Math.abs(degrees) - 90) <= Constants.BULLET_CRITICALANGLE) {
                        continue
                    }
                    // the initial angle and terminal angle sum to 0
                    var angleChange = (0 - degrees*2) * Math.PI/180;
                    this.players[i].bullets[j].angle += angleChange;
                }
                var oldPosy = this.players[i].bullets[j].posy;
                this.players[i].bullets[j].posy -= Constants.BULLET_SPEED * Math.cos(this.players[i].bullets[j].angle);
                if (this.checkBulletWallCollisions(this.players[i].bullets[j])) {
                    this.players[i].bullets[j].posy = oldPosy;
                    var degrees = this.players[i].bullets[j].angle * 180/Math.PI;
                    // removes the bullets whose angles the meet or exceed the critical angle
                    if (Math.abs(Math.abs(degrees) - 90) >= Constants.BULLET_CRITICALANGLE) {
                        continue
                    }
                    // the initial angle and the terminal angle sum to 180
                    var angleChange = (180 - degrees*2) * Math.PI/180;
                    this.players[i].bullets[j].angle += angleChange;
                }
                arr.push(this.players[i].bullets[j]);
            }
            delete this.players[i].bullets;
            this.players[i].bullets = arr;
        }
    }
}