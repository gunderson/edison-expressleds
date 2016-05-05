/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

"use strict";
var _ = require("lodash");
var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var sassMiddleware = require('node-sass-middleware');
var jadeBrowserMiddleware = require('jade-browser-middleware')
var app = express();

var express = require('express'),
    sass = require('node-sass'),
    path = require('path');

var app = express();
app = _.extend(app, BackboneEvents);

app.set('views', __dirname + '../jade');
app.set('view engine', 'jade');
app.use(methodOverride());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: false
    }))
    // parse application/json
app.use(bodyParser.json())

app.use(
    sassMiddleware({
        src: __dirname + '../sass',
        dest: __dirname + '../../../dist/front-end/styles',
        prefix: '/styles',
        debug: true,
    })
);

app.use(jadeBrowserMiddleware(__dirname + '../jade/', {
    dest: __dirname + '/public'
    namespace: 'templates',
    format: 'camelcase'
}));
app.use(express.logger('dev'));

app.use(express.static(path.join(__dirname, '../../../dist/front-end')));


app.get('/', function(req, res) {
    res.render("index");
});

app.listen(80, function() {
    console.log('Front-end server listening on port 80!');
});

module.exports = app;
