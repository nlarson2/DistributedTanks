var Constant = require('../shared/constants.js');
// Game class
const Game = require('./game');
const TDM = require('./TDM');

//const game = new Game();
//console.log(process.env);
if(process.env.env == 1)
    game = new Game();
else
    game = new TDM();

process.on("message", (msg) => {
    //msg = JSON.parse(msg)
    //console.log(msg)
    switch(msg.msgType) {
        
        case "login":
            //console.log("login")
            try{
                game.addPlayer(msg.id, msg.name);
                var loginMsg = {
                    map: game.map,
                    id: msg.id,
                    msgType: "login"
                }
                process.send(loginMsg)
            } catch(error){}
            break;
        case "kbinput":
            try{
            game.handleKBInput(msg.id, msg.input);
            }
            catch(error){}
            break;
        case "minput":
            try{
            game.handleMouseInput(msg.id);
            }catch(error){}
            break;
        case "disconnect":
            try{
            console.log("DISCONNECTING")
            game.removePlayer(msg.id);
            } catch(error){}
            break;
        default:
            console.log("default")
            break;
    }
})

setInterval(function() {
    game.updateBullets();
    var update = {
        msgType: "update",
        players: game.players,
        teams: game.teams
    }
    process.send(update);
        //send messsage back master processt('update', JSON.stringify(update))
}, 1000/Constant.FPS);