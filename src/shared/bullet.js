
var Constants = require('./constants.js');

module.exports = class Bullet {
    constructor(angle, x, y, spawnTime) {
        this.spawnTime = spawnTime;
        this.angle = angle;
        this.posx = x + Constants.PLAYER_HEIGHT * Math.sin(angle);
        this.posy = y - Constants.PLAYER_HEIGHT * Math.cos(angle);
    }
    

    toJSON() {
        return {
            angle: this.angle,
            x: this.posx,
            y: this.posy,
        };
    }
}