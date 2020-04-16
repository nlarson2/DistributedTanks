const express = require("express")
const app = express()
var http = require('http').Server(app);

var bodyParser = require('body-parser');
const net = require('net')


var port = 44444
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("dist"));

var server = net.createServer({server: http})

server.on('connection', (sk) => {
    console.log("CONNECTED")
    sk.on("message", (msg) => {
        console.log(msg)
    })
})

http.listen(port, () => console.log("Example app listening on port " + port + "!"));
server.listen(http, () => console.log("NET"));