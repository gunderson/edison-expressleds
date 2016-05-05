var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var app = express();

BackboneEvents.mixin(app);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get("/play", function(req, res){
  app.trigger("play");
  console.log("play");
  res.send({play:true});
});


app.get("/stop", function(req, res){
  app.trigger("stop");
  console.log("stop");
  res.send({stop:true});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
