"use strict";
var _ = require("lodash");
var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var sassMiddleware = require('node-sass-middleware');
var favicon = require('serve-favicon');
var logger = require('morgan');
var babelify = require('express-babelify-middleware');

var app = express();
var express = require('express');
var sass = require('node-sass');
var path = require('path');

var app = express();
app = _.extend(app, BackboneEvents);
app.use(logger('dev'));
app.use(methodOverride());

app.set("env", "development");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}));
// parse application/json
app.use(bodyParser.json());

app.use(
    sassMiddleware({
        src: path.resolve(__dirname, '../sass'),
        dest: path.resolve(__dirname, '../../../dist/front-end/css'),
        prefix: '/css',
        debug: true,
        indentedSyntax: true,
        sourceMap: true,
    })
);

app.use(express.static(path.resolve(__dirname, '../../../dist/front-end')));

app.use(express.static(path.resolve(__dirname, '../../../node_modules')));

app.use('/js', babelify(
    path.resolve(__dirname, '../js')
));



app.set('views', __dirname + '/../jade/');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render("index.jade");
});

app.listen(80, function() {
    console.log('Front-end server listening on port 80!');
});

module.exports = app;
