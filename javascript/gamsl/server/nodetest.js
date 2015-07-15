/**
 * Created by Gamer on 7/1/2015.
 */

var ioSockets = require('socket.io').listen(8081).sockets;

var positions = {};

ioSockets.on('connection',function(socket){


    console.log( "New player connected " +  socket.id );

    socket.on( 'updatePos', function (data) {

        positions[socket.id] = data;

    });

    socket.on( 'disconnect', function() {

        ioSockets.emit( "playerLeft", socket.id );
        delete positions[socket.id];

    });

    socket.emit( "initOtherPlayers", positions );
   // ioSockets.emit( "playerEntered", socket.id );




});

setInterval(function(){

    ioSockets.emit( "positions", positions );

},17);



