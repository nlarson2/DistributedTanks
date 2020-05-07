// https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
//https://github.com/mozdevs/gamedev-js-tiles/blob/gh-pages/square/scroll.js

const Player = require('./../shared/player');
const Bullet = require('./../shared/bullet');

var Constants = require('../shared/constants.js');

module.exports = class Game {
    constructor() {
        //this.sockets = {};
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
    addPlayer(id, username) {
        //this.sockets[socket.id] = socket;
    


        //
        console.log("SOCKET " +id)
        this.players[id] = new Player(id, username);
        // player might spawn inside the wall, so just choose another spawn if it happens
        if (this.checkPlayerWallCollisions(id)) {
            this.respawnPlayer(this.players[id]);
        }
    }

    removePlayer(id) {
        console.log("SOCKET REM " + id)
        //delete this.sockets[id];
        delete this.players[id];
    }
    handleKBInput(id, inputs) {
        this.players[id].barrelAngle = inputs.mouseAngle;
        if (inputs.right) {
            var angle = this.players[id].tankAngle + Constants.PLAYER_TURN_SPEED * Math.PI/180;
            if (angle > Constants.MAX_ANGLE) {
                angle = Constants.MIN_ANGLE;
            }
            if (angle < Constants.MIN_ANGLE) {
                angle = Constants.MAX_ANGLE;
            }
            this.players[id].tankAngle = angle;
        }
        if (inputs.left) {
            var angle = this.players[id].tankAngle - Constants.PLAYER_TURN_SPEED * Math.PI/180;
            if (angle > Constants.MAX_ANGLE) {
                angle = Constants.MIN_ANGLE;
            }
            if (angle < Constants.MIN_ANGLE) {
                angle = Constants.MAX_ANGLE;
            }
            this.players[id].tankAngle = angle;
        }
        if (inputs.forward) {
            var oldPosx = this.players[id].posx;
            this.players[id].posx += Constants.PLAYER_SPEED * Math.sin(this.players[id].tankAngle);
            if(this.checkPlayerWallCollisions(id)) {
                this.players[id].posx = oldPosx;
            }
            var oldPosy = this.players[id].posy;
            this.players[id].posy -= Constants.PLAYER_SPEED * Math.cos(this.players[id].tankAngle);
            if(this.checkPlayerWallCollisions(id)) {
                this.players[id].posy = oldPosy;
            }
        }
        if (inputs.backward) {
            var oldPosx = this.players[id].posx;
            this.players[id].posx -= Constants.PLAYER_SPEED * Math.sin(this.players[id].tankAngle);
            if(this.checkPlayerWallCollisions(id)) {
                this.players[id].posx = oldPosx;
            }
            var oldPosy = this.players[id].posy;
            this.players[id].posy += Constants.PLAYER_SPEED * Math.cos(this.players[id].tankAngle);
            if(this.checkPlayerWallCollisions(id)) {
                this.players[id].posy = oldPosy;
            }
        }
    }


    handleMouseInput(id, inputs) {
        if (Math.floor((Date.now() - this.players[id].lastFire)/1000) >= Constants.PLAYER_FIRECOOLDOWN) {
            this.players[id].bullets.push(new Bullet(this.players[id].barrelAngle, this.players[id].posx, this.players[id].posy, Date.now()));
            this.players[id].lastFire = Date.now();
        }
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
    //added a second parameter to fix the bug causing the same player to hit himself and earn points
    checkBulletPlayerCollisions(bullet, Pnumber) {
        for (var i in this.players) { 
            if(Pnumber != i) {
            //    console.log("Pnumber: %i   |   i:  %i   \n", Pnumber, i);
            // get coords of each corner of the player's tank body
            var player_center = {x: this.players[i].posx, y: this.players[i].posy};
            // rotate bullet about player center to realign with axes
            var rotated_bullet = this.rotatePoint(bullet.posx, bullet.posy, -this.players[i].tankAngle, player_center);
            // get player tank corners without rotation to realign with axes
            var W = Constants.PLAYER_WIDTH/2;
            var H = Constants.PLAYER_HEIGHT/2;
            var corners = { topRight: {x: this.players[i].posx + W, y: this.players[i].posy + H},
                            topLeft: {x: this.players[i].posx - W, y: this.players[i].posy + H},
                            bottomRight: {x: this.players[i].posx + W, y: this.players[i].posy - H},
                            bottomLeft: {x: this.players[i].posx - W, y: this.players[i].posy - H}}
            var x = rotated_bullet.x;
            var y = rotated_bullet.y;
            
            if (x < corners.topRight.x && x > corners.topLeft.x &&
                y > corners.bottomRight.y && y < corners.topRight.y) {
                this.players[i].health -= Constants.BULLET_DAMAGE;
                // respawn hit player
                if(this.players[i].health <= 0) {
                    this.respawnPlayer(this.players[i]);
                    this.players[i].health = 100;
                    return {hit: true, kill: true};
                }
                return {hit: true, kill: false};        
            }
        }
    }
    return {hit: false, kill: false};
}

    updateBullets() {
        for (var i in this.players) {
            var arr = []
            for (var j = 0; j < this.players[i].bullets.length; j++) {
                // repawn hit player, increment score, and remove bullet that hits
                var hitCheck = this.checkBulletPlayerCollisions(this.players[i].bullets[j], i)
                if (hitCheck.hit) {
                    if (hitCheck.kill) {
                        this.players[i].score += 1;
                    }
                    continue
                }
                // removes bullets that live too long
                if (Math.floor((Date.now() - this.players[i].bullets[j].spawnTime)/1000) >= Constants.BULLET_LIFETIME) {
                    continue
                }
                // change player's x and check collision
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
                // change player's y and check collision
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

    rotatePoint(x, y, angle, center_of_rotation) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        x -= center_of_rotation.x;
        y -= center_of_rotation.y;
        var tempX = x * cos - y * sin;
        var tempY = x * sin + y * cos;
        return {x: tempX+center_of_rotation.x, y: tempY+center_of_rotation.y};
    }

    respawnPlayer(socket) {
        this.players[socket.id].tankAngle = 0;
        this.players[socket.id].barrelAngle = 0;
        do {
            this.players[socket.id].posx = 64*30 * (0.25 + Math.random() * 0.5);
            this.players[socket.id].posy = 64*30 * (0.25 + Math.random() * 0.5);
        } while (this.checkPlayerWallCollisions(socket.id));
    }
}