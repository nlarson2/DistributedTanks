const Constants = require('./constants.js');
const Bullet = require('./../shared/bullet');

module.exports = class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // give player random initial position within the map boundaries
        this.posx = 64*30 * (0.25 + Math.random() * 0.5);
        this.posy = 64*30 * (0.25 + Math.random() * 0.5);
        // angles are in radians
        this.tankAngle = 0;
        this.barrelAngle = 0;
        this.bullets = [];
        this.score = 0;
        this.health = 100;
        this.team = 0;
        this.lastFire = 0;
        this.tstate = 0;
    }

    toJSON() {
        return {
            socket_id: this.id,
            name: this.name,
            x: this.posx,
            y: this.posy,
            tank_angle: this.tankAngle,
            barrel_angle: this.barrelAngle,
            bullets: this.bullets,
            score: this.score,
            health: this.health,
            team: this.team,
            tstate: this.tstate
        };
    }
    /*
    getTankCorners() {
        var cos = Math.cos(this.tankAngle);
        var sin = Math.sin(this.tankAngle);
        var W = Constants.PLAYER_WIDTH/2;
        var H = Constants.PLAYER_HEIGHT/2;
        var topMiddle = {x: this.posx + sin * H, 
                        y: this.posy - cos * H};
        var bottomMiddle = {x: this.posx - sin * H, 
                            y: this.posy + cos * H};

        var topRight = {x: topMiddle.x - cos * W,
                        y: topMiddle.y - sin * W};

        var topLeft = {x: topMiddle.x + cos * W,
                       y: topMiddle.y + sin * W};

        var bottomRight = {x: bottomMiddle.x + cos * W,
                           y: bottomMiddle.y + sin * W};

        var bottomLeft = {x: bottomMiddle.x - cos * W,
                          y: bottomMiddle.y - sin * W};
        return {
            topRight: topRight,
            topLeft: topLeft,
            bottomRight: bottomRight,
            bottomLeft: bottomLeft
        }
    }
    */
}

