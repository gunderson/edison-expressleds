var five = require("johnny-five");
var Edison = require("edison-io");
var _ = require("lodash");
var currentLEDIndex = 0;
var startTime = 0;

var tickDuration = 1/60;
var currentInterval = null;
var leds, board;

function setup(){
  board = new five.Board({
    io: new Edison()
  });
  board.on("ready", function() {
    leds = new five.Leds([3,4,5,6,7,8,9,10,11]);
    play();
  });
}

function loop(){
  var playTime = Date.now() - startTime;
  var currentTick = Math.floor(playTime / tickDuration);

  leds.each((led)=>{
      led.off();
  });
  leds[currentLEDIndex].on();
  currentLEDIndex = (currentTick) % leds.length;
  console.log("loop");
}

function play(){
  if (currentInterval) return;
  startTime = Date.now();
  currentInterval = setInterval(loop, tickDuration);
}

function stop(){
  clearInterval(currentInterval);
  currentInterval = null;
}

module.exports = {
  setup,
  play,
  stop
};
