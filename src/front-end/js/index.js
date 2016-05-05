var $ = require("zepto");
var _ = require("lodash");


$("button.play").click(() => $.get("http://http://192.168.6.249:3000/play"));
$("button.stop").click(() => $.get("http://http://192.168.6.249:3000/stop"));
