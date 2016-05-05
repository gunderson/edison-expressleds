var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var app = express();

BackboneEvents.mixin(app);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get("/play", function(){
  app.trigger("play");
});


app.get("/stop", function(){
  app.trigger("stop");
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
