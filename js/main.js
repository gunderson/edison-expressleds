var server = require("./server");
var robot = require("./robot");

server.on("play", robot.play);
server.on("stop", robot.stop);
