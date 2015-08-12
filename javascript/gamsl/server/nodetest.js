/**
 * Created by Gamer on 7/1/2015.
 */


    GLOBAL.THREE = require("gamsl_server/three.js");

var ioSockets = require('socket.io').listen(8081).sockets;

var positions = {};

console.log("Server Starting");

var server = require("gamsl_server/server.js");
var communicator = require("gamsl_server/communicator.js");
var engine = require("gamsl_server/engine.js");


communicator.setSocketIO( ioSockets );
server.setSender( communicator );
server.setEngine( engine );

communicator.registerListener( "playerState", engine.updatePlayer );
communicator.registerListener( "wantJoin", function ( msg ) {

    console.log("Adding player to engine");
    engine.addPlayer( msg );
    ioSockets.emit( "playerJoined", msg );


} );

server.start();

ioSockets.on( 'connection', function ( socket ) {


    console.log( "New player connected " +  socket.id );

    socket.on( "helloServer", function ( msg ) {

        console.log(socket.id+": "+msg);
        socket.emit( "hello", "hello from server" );

    });

    communicator.addAllListenersToClient( socket );

    socket.on("disconnect",function() {

        engine.removePlayer( socket.id );
        ioSockets.emit( "playerLeft", socket.id );
        console.log("playerLeft "+socket.id);

    } );

});

console.log(THREE.REVISION);




