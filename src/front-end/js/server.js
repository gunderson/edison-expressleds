/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

"use strict";
var _ = require("lodash");
var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var sassMiddleware = require('node-sass-middleware');
var browserify = require('browserify-middleware');
var favicon = require('serve-favicon');
var app = express();

var express = require('express'),
    sass = require('node-sass'),
    path = require('path');

var app = express();
app = _.extend(app, BackboneEvents);

app.set('views', __dirname + '/../jade/');
app.set('view engine', 'pug');
app.use(methodOverride());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.use(
    sassMiddleware({
        src: __dirname + '../sass',
        dest: __dirname + '../../../dist/front-end/styles',
        prefix: '/styles',
        debug: true,
        indentedSyntax: true,
        sourceMap: true
    })
);

app.use('/js', browserify(__dirname + '/public/javascripts'));
app.use(express.static(path.join(__dirname, '../../../dist/front-end')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.get('/', function(req, res) {
    res.render("index.jade");
});

app.listen(80, function() {
    console.log('Front-end server listening on port 80!');
});

module.exports = app;
