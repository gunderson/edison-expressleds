"use strict";
var BackboneEvents = require( "backbone-events-standalone" );
var _ = require( "lodash" );
var express = require( "express" );
var HeaderUtils = require( "./utils/HeaderUtils" );
var logger = require( "morgan" );

var app = express();
app = _.extend( app, BackboneEvents );

var router = express.Router();
router.use( logger( 'dev' ) );

router.all( '/', function ( req, res ) {
	HeaderUtils.addJSONHeader( res );
	HeaderUtils.addCORSHeader( res );
	res.send( 'Hello World!' );
} );

router.all( "/led/:id/:state", function ( req, res ) {
	HeaderUtils.addJSONHeader( res );
	HeaderUtils.addCORSHeader( res );
	app.trigger( "led", req.params );
} );

router.all( "/play", function ( req, res ) {
	HeaderUtils.addJSONHeader( res );
	HeaderUtils.addCORSHeader( res );
	res.send( {
		play: true,
	} );
	app.trigger( "play", req.params.id );
} );

router.all( "/stop", function ( req, res ) {
	HeaderUtils.addJSONHeader( res );
	HeaderUtils.addCORSHeader( res );
	res.send( {
		stop: true,
	} );
	app.trigger( "stop", req.params.id );
} );

app.listen( 3000, function () {
	console.log( 'API server listening on port 3000!' );
} );

module.exports = app;
