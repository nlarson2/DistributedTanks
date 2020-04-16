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
            score: this.score
        };
    }
}

