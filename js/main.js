var server = require("./server");
var robot = new require("./robot")();

server.on("play", robot.play);
server.on("stop", robot.stop);
