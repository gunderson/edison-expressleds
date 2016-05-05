
var BackboneEvents = require("backbone-events-standalone");
var five = require("johnny-five");
var Edison = require("edison-io");
var _ = require("lodash");

var Robot = function(){

  BackboneEvents.mixin(this);

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
    return this;
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
    return this;
  }

  function play(){
    if (currentInterval) return;
    startTime = Date.now();
    currentInterval = setInterval(loop, tickDuration);
    return this;
  }

  function stop(){
    clearInterval(currentInterval);
    currentInterval = null;
    return this;
  }

  setup();

  this.stop = stop;
  this.play = play;
  this.setup = setup;
  this.board = board;

  return this;

}

module.exports = Robot;
