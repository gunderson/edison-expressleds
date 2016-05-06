var $ = require("jquery");
var _ = require("lodash");
var io = require("socket.io-client");

var socket = io('http://localhost');
socket.on('connect', function() {});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

$("button.play").click(() => $.get("http://10.0.1.8:3000/play"));
$("button.stop").click(() => $.get("http://10.0.1.8:3000/stop"));

$("input[type=checkbox]").change((el) => {
    var $el = $(el);
    if ($el.is(":checked")) {
        $.get(`http://10.0.1.8:3000/led/${ $el.val() }/on`);
    } else {
        $.get(`http://10.0.1.8:3000/led/${ $el.val() }/off`);
    }
});
