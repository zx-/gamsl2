/**
 * Created by Gamer on 7/1/2015.
 */
GAMSL.SocketConnection = function ( renderer ) {

    var socketIourl = 'http://rarcoo.synology.me:8081/socket.io/socket.io.js';
    var onDownload = this._onSuccess.bind(this);
    this._socket = null;
    this._renderer = renderer;
    this._player = null;
    this._otherPlayers = {};

    this._lastTime = 0


    $.getScript(socketIourl)
        .done(function(){
            console.log( 'socketsLoaded' );
            onDownload();

        })
        .fail(function(){
            console.log( "Failed To load Script" );
        })

};

GAMSL.SocketConnection.prototype = {

    _onSuccess: function () {

        console.log( "Successufull connection" );

        this._socket = io.connect( 'http://rarcoo.synology.me:8081' );


       // this._socket.on( "playerEntered", this._onPlayerEntered.bind(this) );
        this._socket.on( "playerLeft", this._onPlayerLeft.bind(this) );

        this._socket.on( "positions", this._receivePos.bind(this) );

    },



    _receivePos: function ( othersPos ) {

        //var timeNow = new Date().getTime();
        //if ( this._lastTime != 0 ) {
        //
        //    var elapsed = timeNow - this._lastTime;
        //    console.log("rec: " + elapsed );
        //
        //}
        //this._lastTime = timeNow;

        for (var player in othersPos) {

            if ( player != this._socket.id ) {

                if ( !this._otherPlayers[player] ) {

                    console.log( "new player entered: "+player );

                    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
                    var material = new THREE.MeshPhongMaterial({color: 0x660000,metal:false});
                    var mesh =  new THREE.Mesh( geometry, material );

                    mesh.position.y = 20;

                    this._otherPlayers[player] = mesh;

                    this._renderer.addRenderable(mesh);

                }

                this._otherPlayers[player].position.x = othersPos[player].x;
                this._otherPlayers[player].position.y = othersPos[player].y;
                this._otherPlayers[player].position.z = othersPos[player].z;

            }

        }

    },

    _onPlayerLeft: function ( data ) {


        if( this._socket.id != data ){

            console.log("player left "+data);
            this._renderer.removeRenderable( this._otherPlayers[data] );
            delete this._otherPlayers[data];

        }

    },


    registerPlayer: function ( player ) {

        this._player = player;

    },

    tick: function ( elapsed ) {
        //
        //console.log(elapsed);

        if ( this._socket != null && this._player != null ) {

            this._socket.emit("updatePos",this._player.position);

        }

    }

};