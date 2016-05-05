"use strict";

var robot = require("./api/js/robot");
var apiServer = require("./api/js/server");
var appServer = require("./front-end/js/server");

apiServer.on("led", (id) => {
    robot.triggerLed(id);
});
