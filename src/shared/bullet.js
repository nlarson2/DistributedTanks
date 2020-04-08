module.exports = class Bullet {
    constructor(angle, x, y, spawnTime) {
        this.spawnTime = spawnTime;
        this.angle = angle;
        this.posx = x;
        this.posy = y;
    }

    toJSON() {
        return {
            angle: this.angle,
            x: this.posx,
            y: this.posy,
        };
    }
}