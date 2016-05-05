/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
    io: new Edison()
});

board.on("ready", function() {
    var led = new five.Led(13);
    led.blink();
});

//
// "use strict";
// var _ = require("lodash");
// var five = require("johnny-five");
// var Edison = require("edison-io");
// var board = new five.Board({
//     io: new Edison()
// });
//
// var currentLEDIndex = 0;
// var leds;
// var interval = null;
//
// var ticksPerSecond = 60;
// var tickIntervalMillis = 1000 / ticksPerSecond;
// var startTime = 0;
// var patternFunction = sweep;
//
// board.on("ready", setup);
//
// function setup() {
//     leds = new five.Leds([13]);
//     leds[0].blink(500);
//     // setInterval(() => {
//     //     leds[0].toggle();
//     // }, 1000);
// }
//
//
// // function setup() {
// //     currentLEDIndex = 0;
// //     leds = new five.Leds([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
// //     play();
// // }
//
// function play() {
//     if (interval) return;
//     startTime = Date.now();
//     interval = setInterval(loop, tickIntervalMillis);
// }
//
// function stop() {
//     clearInterval(interval);
// }
//
// function loop() {
//     var now = Date.now();
//     var runTime = now - startTime;
//     var tick = Math.floor(runTime / tickIntervalMillis);
//     patternFunction(tick);
//     currentLEDIndex = (currentLEDIndex + 1);
// }
//
// function sweep(tick) {
//     leds.each(function(led) {
//         led.off();
//     })
//     leds[tick % leds.length].on();
// }
//
// function triggerLed(id) {
//     // stop loop
//     stop();
//     // kill other leds
//     leds.each((led) => led.off());
//     // start the led at id
//     currentLEDIndex = id;
//     leds[currentLEDIndex].on();
// }
//
// module.exports = {
//     triggerLed,
//     play,
//     stop
// }
