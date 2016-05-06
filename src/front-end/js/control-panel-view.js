var $ = require("jquery");
var _ = require("lodash");


$("button.play").click(() => $.get("http://10.0.1.8:3000/play"));
$("button.stop").click(() => $.get("http://10.0.1.8:3000/stop"));
