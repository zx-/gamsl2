/**
 * Created by Gamer on 7/1/2015.
 */
GAMSL.SocketConnection = function () {

    var socketIourl = 'http://rarcoo.synology.me:8081/socket.io/socket.io.js';
    var onDownload = this._onSuccess.bind(this);

    this._socket = null;
    /**
     * True after successful socket connect.
     * @type {boolean}
     * @private
     */
    this._socketReady = false;

    /**
     * Callbacks to be called after connection is established
     * @type {Array}
     * @private
     */
    this._readyCallbacks = [];



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

    /**
     * Runs after successful socket connection. Sets socketReady flag and calls all
     * registered onReady callbacks
     * @private
     */
    _onSuccess: function () {

        console.log( "Successufull connection" );

        this._socket = io.connect( 'http://rarcoo.synology.me:8081' );

        this._socket.on('connect', function () {

            this._socketReady = true;

            for( var i = 0 ; i < this._readyCallbacks.length; i++ ) {

                this._readyCallbacks[i]();

            }
            this._readyCallbacks = [];

        }.bind( this ) );

    },

    /**
     * Sends message to server. If socket is not ready sending is postponed until ready.
     * @param name - name of message - socket.on(name,msg) on server side;
     * @param msg
     */
    sendToServer: function ( name, msg ) {


        if ( this._socketReady ) {

            msg.playerId = this._socket.id;
            this._socket.emit( name, msg );

        } else {

            this.onReady(function(){

                msg.playerId = this._socket.id;
                this._socket.emit( name, msg );

            }.bind( this ) );

        }

    },

    /**
     * registers function that will be called after message with name arrived.
     * socket.on(name,func) in client. Event will be added after socket is ready.
     * @param name
     * @param func
     */
    registerMessageListener: function( name, func ) {

        if ( this._socketReady ) {

            this._socket.on( name, func );

        } else {

            this.onReady(function(){

                this._socket.on( name, func );

            }.bind( this ) );

        }

    },

    /**
     * adds function that will be called after successful socket connect.
     * @param f
     */
    onReady: function ( f ) {

        this._readyCallbacks.push( f );

    },

    getMyId: function () {

        if ( this._socketReady ) {

            return this._socket.id;

        } else {

            return null;

        }

    }


};