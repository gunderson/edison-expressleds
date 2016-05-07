"use strict";
var BackboneEvents = require( "backbone-events-standalone" );
var _ = require( "lodash" );
var express = require( "express" );

var app = express();
app = _.extend( app, BackboneEvents );

app.get( '/', function ( req, res ) {
	res.send( 'Hello World!' );
} );

app.get( "/led/:id/:state", function ( req, res ) {
	app.trigger( "led", req.params );
} );

app.get( "/play", function ( req, res ) {
	res.send( {
		play: true,
	} );
	app.trigger( "play", req.params.id );
} );

app.get( "/stop", function ( req, res ) {
	res.send( {
		stop: true,
	} );
	app.trigger( "stop", req.params.id );
} );

app.listen( 3000, function () {
	console.log( 'API server listening on port 3000!' );
} );

module.exports = app;
