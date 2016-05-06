var $ = require("jquery");
var _ = require("lodash");
// var io = require("socket.io-client");

// var socket = io('http://localhost');
// socket.on('connect', function() {});
// socket.on('event', function(data) {});
// socket.on('disconnect', function() {});

var localIp = "192.168.6.249";
var localPort = "3000";

$("button.play").click(() => $.get(`http://${localIp}:${localPort}/play`));
$("button.stop").click(() => $.get(`http://${localIp}:${localPort}/stop`));

$("input[type=checkbox]").change((i,el) => {
    console.log(this, arguments);
    if (el.checked) {
        $.get(`http://${localIp}:${localPort}/led/${ el.value }/on`);
    } else {
        $.get(`http://${localIp}:${localPort}/led/${ el.value }/off`);
    }
});
