/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

"use strict";
var _ = require("lodash");
var BackboneEvents = require("backbone-events-standalone");
var express = require('express');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var sassMiddleware = require('node-sass-middleware');
var favicon = require('serve-favicon');
var babel = require('babel-middleware');
var app = express();

var express = require('express'),
    sass = require('node-sass'),
    path = require('path');

var app = express();
app = _.extend(app, BackboneEvents);

app.set("env", "development");
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
        src: path.resolve(__dirname, '../sass'),
        dest: path.resolve(__dirname, '../../../dist/front-end/css'),
        prefix: '/css',
        debug: true,
        indentedSyntax: true,
        sourceMap: true
    })
);

app.use('/js', babel({
    srcPath: path.resolve(__dirname, '../js'),
    cachePath: path.resolve(__dirname, '../../../dist/front-end/js'),
    babelOptions: {
        presets: ['es2015']
    },
    debug: true
}));

if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

}


console.log("PATH PATH PATH PATH", path.resolve(__dirname, '../js'), path.resolve(__dirname, '../../../dist/front-end/js'))

app.use(express.static(path.resolve(__dirname, '../../../dist/front-end')));
app.use(express.static(path.resolve(__dirname, 'node_modules')));

app.get('/', function(req, res) {
    res.render("index.jade");
});

app.listen(80, function() {
    console.log('Front-end server listening on port 80!');
});

module.exports = app;
