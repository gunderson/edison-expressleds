"use strict";

var robot = require("./api/js/robot");
var apiServer = require("./api/js/server");
var appServer = require("./front-end/js/server");

apiServer.on("led", robot.triggerLed);
apiServer.on("play", robot.play);
apiServer.on("stop", robot.stop);
