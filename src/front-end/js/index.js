var $ = require("zepto-node");
var _ = require("lodash");


$("button.play").click(() => $.get("http://192.168.6.249:3000/play"));
$("button.stop").click(() => $.get("http://192.168.6.249:3000/stop"));
