"use strict";
var BackboneEvents = require( "backbone-events-standalone" );
var _ = require( "lodash" );
var bodyParser = require( "body-parser" );
var express = require( "express" );
var favicon = require( "serve-favicon" );
var logger = require( "morgan" );
var methodOverride = require( "method-override" );
var path = require( "path" );
var sassMiddleware = require( "node-sass-middleware" );
var sass = require( "node-sass" );

var app = express();
app = _.extend( app, BackboneEvents );
app.use( logger( 'dev' ) );
app.use( methodOverride() );

app.set( "env", "development" );
// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( {
	extended: false,
} ) );
// parse application/json
app.use( bodyParser.json() );

app.set( 'views', path.resolve( __dirname, '../jade/static/' ) );
app.set( 'view engine', 'pug' );

app.use(
	sassMiddleware( {
		src: path.resolve( __dirname, '../sass' ),
		dest: path.resolve( __dirname, '../css' ),
		prefix: '/css',
		debug: true,
		indentedSyntax: true,
		sourceMap: true,
	} )
);

app.use( express.static( path.resolve( __dirname, "../../../dist/" ) ) );

app.get( '/', function ( req, res ) {
	res.render( "index.jade" );
} );

app.listen( 80, function () {
	console.log( 'Front-end server listening on port 80!' );
} );

module.exports = app;
