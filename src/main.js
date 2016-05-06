"use strict";

var robot = require("./api/js/robot");
var apiServer = require("./api/js/server");
var appServer = require("./front-end/js/server");

apiServer.on("led", robot.triggerLed);
apiServer.on("play", robot.play);
apiServer.on("stop", robot.stop);

var deviceConfig = require("resin-device-config");

deviceConfig.getByDevice('60a3dc4ebdd58d5b3a8ae4be61ef6107a60ddd84dafebcf02fdc7c8e33957c', {
    network: 'wifi',
    wifiSsid: 'G7',
    wifiKey: '1234qwerasdfzxcv'
});
