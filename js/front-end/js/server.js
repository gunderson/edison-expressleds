"use strict";
var _ = require("lodash");
var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var app = express();

var express = require('express'),
    sass = require('node-sass'),
    path = require('path');

var app = express();
app = _.extend(app, BackboneEvents);

app.configure(function() {
    app.set('views', __dirname + '../jade');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(
        sass.middleware({
            src: __dirname + '../sass',
            dest: __dirname + '../../../public/styles',
            prefix: '/styles',
            debug: true,
        })
    );

    app.use(express.static(path.join(__dirname, '../../../public')));

});

app.get('/', function(req, res) {
    res.send("../jade/index.jade");
});

app.listen(80, function() {
    console.log('Front-end server listening on port 80!');
});

module.exports = app;
