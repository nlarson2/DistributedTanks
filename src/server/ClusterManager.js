const path = require("path")
const cluster = require("cluster")
const numCPUs = require('os').cpus().length;
//const Game = require("Game")


sockets = {};

var maxPlayerCount = 8;

module.exports = class ClusterManager {
    constructor(){
        this.itr = 0;
        this.length = 0;
        this.inWorker = {};
        this.gameTypes = {};
        cluster.setupMaster({
            exec: './src/server/worker.js'
        });
    }
    
    //create a new process to handle a game //code at bottom
    StartServer(arg) {
        //add args to setupMaster for different games
        cluster.setupMaster({
            exec: './src/server/worker.js'
        });
        var worker = cluster.fork({env: arg});
        //console.log(arg);
        this.length++;
        this.itr++;
        //console.log("STARTED: " + this.itr)
        this.inWorker[this.itr] = 0
        this.gameTypes[this.itr] = arg;
        /*var gameType;// = arg != null ? arg : 1;
        if(arg != null)
            gameType = arg;
        else
            gameType = 1;
        worker.send("start_game", arg)*/

        worker.on("message", function(msg){
            //console.log(msg.id)
            switch(msg.msgType) {
                case "login":
                    //console.log("In worker.on(): " + sockets + msg.id)
                    sockets[msg.id].emit('mapUpdate', JSON.stringify(msg.map));
                    break;
                case "update":
                    for(var id in msg.players) {
                        sockets[id].emit("update", JSON.stringify(msg));
                    }
                    break;
                default:
                    //console.log("YOU messed UP");
                    break;
            }
        })
        /*var gameType;// = arg != null ? arg : 1;
        if(arg != null)
            gameType = arg;
        else
            gameType = 1;
        worker.eventNames("start_game", arg)*/
    }
    //kill a server
    CloseServer(id) {
        for(var workerID in cluster.workers) {
            if(workerID == id) {
                cluster.workers[workerID].kill();
                this.length--;
            }
        }
    }
    GetServers() {
        if(cluster.isMaster) {
            var workerIDs = []
            for (const id in cluster.workers) {
                workerIDs.push(id)
            }
            return workerIDs
        }
    }
    GetCluster(){
        return cluster
    }
    gatherInfo() {
        var ret = []
        for (var worker in cluster.workers){
            var r = {
                id: worker,
                name: "Server " + worker,
                playerCount: this.inWorker[worker],
                gametype: this.gameTypes[worker]
            }
            ret.push(r)
        }
        //console.log(ret)
        return ret
    }
    pickWorker() {
        //return newest server for now
        return this.length;
    }

    allocatePlayer(socket, pName, serverNum) {
        /*var workerID = this.pickWorker();
        if (this.length < 1 || this.inWorker[workerID] >= maxPlayerCount) {
            this.StartServer();
            workerID = this.pickWorker();
        }*/
        var sendMsg = { 
                    id: socket.id,//socket['conn']),
                    name: pName,
                    msgType: "login"
                  };
        //var outMsg = JSON.stringify(sendMsg);
        //console.log(outMsg);
        sockets[socket.id] = socket;
        console.log("In AllocatePlayer: "+ sockets[socket.id.toString()] + socket.id);
        cluster.workers[serverNum].send(sendMsg);
        this.inWorker[serverNum]++;
    
        //return workerID.toString();
    }

    handleKBInput(workerID, playerID, inputs) {
        var sendMsg = {
            msgType: 'kbinput',
            id: playerID,
            input: inputs
        }
        //cluster.workers[workerID.toString()].send(JSON.stringify(sendMsg));
        cluster.workers[workerID.toString()].send(sendMsg);
    }

    handleMouseInput(workerID, playerID) {
        var sendMsg = {
            msgType: 'minput',
            id: playerID
        }
        cluster.workers[workerID.toString()].send(sendMsg);
    }

    removePlayer(workerID, playerID){
        var sendMsg = {
            id: playerID,
            msgType: 'disconnect'
        }
        cluster.workers[workerID.toString()].send(sendMsg);
        this.inWorker[workerID]--;
    }


}