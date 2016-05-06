"use strict";
import _ from "lodash";
import BackboneEvents from "backbone-events-standalone";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import sassMiddleware from "node-sass-middleware";
import favicon from "serve-favicon";
import logger from "smorgan";
import babelify from "express-babelify-middleware";
import sass from "node-sass";
import path from "path";

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

app.set('views', __dirname + '/../jade/');
app.set('view engine', 'pug');

app.use(
    sassMiddleware({
        src: path.resolve(__dirname, '../sass'),
        dest: path.resolve(__dirname, '../css'),
        prefix: '/css',
        debug: true,
        indentedSyntax: true,
        sourceMap: true,
    })
);

app.use(express.static(path.resolve(__dirname, "../")));
app.use(express.static(path.resolve(__dirname, '../../../node_modules')));

app.get('/', function(req, res) {
    res.render("index.jade");
});

app.listen(80, function() {
    console.log('Front-end server listening on port 80!');
});

module.exports = app;
