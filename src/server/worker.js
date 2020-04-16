var Constant = require('../shared/constants.js');
// Game class
const Game = require('./game');
const game = new Game();


process.on("message", (msg) => {
    //msg = JSON.parse(msg)
    switch(msg.msgType) {
        case "login":
            game.addPlayer(msg.id, msg.name);
            var loginMsg = {
                map: game.map,
                id: msg.id,
                msgType: "login"
            }
            process.send(loginMsg)
            break;
        case "kbinput":
            game.handleKBInput(msg.id, msg.input);
            break;
        case "minput":
            game.handleMouseInput(msg.id);
            break;
        case "disconnect":
            game.removePlayer(msg.id);
            break;
        default:
            break;
    }
})

setInterval(function() {
    game.updateBullets();
    var update = {
        msgType: "update",
        players: game.players
    }
    process.send(update);
        //send messsage back master processt('update', JSON.stringify(update))
}, 1000/Constant.FPS);