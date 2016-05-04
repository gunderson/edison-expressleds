var five = require("johnny-five");
var Edison = require("edison-io");
var _ = require("lodash");
var leds = new five.Leds([3,4,5,6,7,8,9,10,11]);
var currentLEDIndex = 0;
var frameDuration = 1/60;
var currentInterval = null;

var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  setup();
});

function setup(){
  play();
}

function loop(){
  leds.each((led)=>{
      led.off();
  });
  leds[currentLEDIndex].on();
  currentLEDIndex = (currentLEDIndex + 1) % leds.length;
}

function play(){
  if (currentInterval) return;
  currentInterval = setInterval(loop, frameDuration);
}

function stop(){
  clearInterval(currentInterval);
  currentInterval = null;
}

module.exports = _.extend(board,{
  play,
  stop
});
