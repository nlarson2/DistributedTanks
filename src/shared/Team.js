const Player = require('./../shared/player');

module.exports = class Team {
    constructor(Tid, Tname) {
        this.Tid = Tid;
        this.Tname = Tname;
        this.Tscore = 0;
        this.playersID = [];
        this.playerCount = 0;
        this.inc = 0;

    }

    toJSON() {
        return {
            Tid: this.Tid,
            Tname: this.Tname,
            Tscore: this.Tscore,
            playersN: this.playersN,
            playersID: this.playersID,
        };
    }


}
