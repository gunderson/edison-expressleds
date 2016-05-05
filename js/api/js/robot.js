/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

"use strict";

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
    io: new Edison()
});

var currentLEDIndex = 0;
var leds;
var interval = null;
board.on("ready", setup);

function play() {
    if (interval) return;
    interval = setInterval(loop, 64);

}

function stop() {
    clearInterval(interval);
}

function triggerLed(id) {
    // stop loop
    stop();
    // kill other leds
    leds.each(function(led) {
            led.off();
        })
        // start the led at id
    currentLEDIndex = id;
    leds[currentLEDIndex].on();
}

function setup() {
    currentLEDIndex = 0;
    leds = new five.Leds([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    play();
}

function loop() {
    leds.each(function(led) {
        led.off();
    })
    leds[currentLEDIndex].on();
    currentLEDIndex = (currentLEDIndex + 1) % leds.length;
}
module.exports = {
    triggerLed,
    play,
    stop
}
