
var BackboneEvents = require("backbone-events-standalone");
var five = require("johnny-five");
var Edison = require("edison-io");
var _ = require("lodash");

var Robot = function(){
  var currentLEDIndex = 0;
  var startTime = 0;

  var tickDuration = 1000/60;
  var currentTimeout = null;
  var leds, board;

  function setup(){
    console.log("Robot::setup");
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
    console.log("Robot::loop a");
    var playTime = Date.now() - startTime;
    console.log("Robot::loop b");
    var currentTick = Math.floor(playTime / tickDuration);
    console.log("Robot::loop c");
    var nextTickTime = startTime + ((currentTick + 1) * tickDuration);
    console.log("Robot::loop d");

    leds.each((led)=>{
        led.off();
    });
    console.log("Robot::loop e");
    leds[currentLEDIndex].on();
    console.log("Robot::loop f");
    currentLEDIndex = (currentTick) % leds.length;
    console.log("Robot::loop d");

    currentTimeout = setTimeout(loop, nextTickTime - Date.now());
    console.log("Robot::loop",nextTickTime - Date.now());
    return this;
  }

  function play(){
    if (currentTimeout) return;
    startTime = Date.now();
    console.log("Robot::play", startTime, tickDuration);
    currentTimeout = setTimeout(loop, tickDuration);
    return this;
  }

  function stop(){
    console.log("Robot::stop");
    clearTimeout(currentTimeout);
    currentTimeout = null;
    return this;
  }

  setup();

  this.stop = stop;
  this.play = play;
  this.setup = setup;
  this.board = board;

  return this;
};

BackboneEvents.mixin(Robot.prototype);

module.exports = Robot;
