/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/26/2015.
 *
 *  pri zavolani update(args) , zavola funkciu controlsInput pre vsetky args a ako parameter
 *  poskytne objekt controlsInput teda momentalny stav inputu,
 *  pohyb mysi je relativny voci poslednemu volaniu update().
 *
 */
//https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API

var GAMSL = GAMSL || {};

//TODO exitPointerLock
GAMSL.Controls = function ( canvas ) {

    this._keys = [ "LEFT", "UP", "DOWN", "RIGHT" ];

    this._canvas = canvas;
    this._controlsInput = {
        movementX : 0,
        movementY : 0,
        LEFT: 0,
        UP: 0,
        RIGHT: 0,
        DOWN: 0,
        IS_LOCKED:0
    };

    this._canvas.requestPointerLock = this._canvas.requestPointerLock ||
        this._canvas.mozRequestPointerLock ||
        this._canvas.webkitRequestPointerLock;

    this._canvas.onclick = this._canvasClick.bind( this );

    if ( "onpointerlockchange" in document ) {

        document.addEventListener(
            'pointerlockchange',
            this._pointerLockChange.bind( this ),
            false );

    } else if ( "onmozpointerlockchange" in document ) {

        document.addEventListener(
            'mozpointerlockchange',
            this._pointerLockChange.bind( this ),
            false );

    } else if ( "onwebkitpointerlockchange" in document ) {

        document.addEventListener(
            'webkitpointerlockchange',
            this._pointerLockChange.bind( this ),
            false );

    }

    document.addEventListener( "mousemove", this._mouseMoveCallback.bind( this ), false );



};

GAMSL.Controls.prototype = {

    _pointerLockChange: function () {

        this._controlsInput.IS_LOCKED = (
            document.pointerLockElement === this._canvas    ||
            document.mozPointerLockElement === this._canvas ||
            document.webkitPointerLockElement === this._canvas );

    },

    _canvasClick: function () {

        this._canvas.requestPointerLock();

    },

    _mouseMoveCallback: function ( e ) {

        var movementX = e.movementX ||
                e.mozMovementX      ||
                e.webkitMovementX   ||
                0;

        var movementY = e.movementY ||
                e.mozMovementY      ||
                e.webkitMovementY   ||
                0;

        this._controlsInput.movementX += movementX;
        this._controlsInput.movementY += movementY;

    },


    /**
     * Adds given key pressed information to controlsInput object
     *
     * @param key - String with single capital key character if keyCode is not set, otherwise any
     * capital string
     * @param keyCode - optional - keyCode for given key if not set code of
     * first character of key is used
     */
    registerKey: function( key, keyCode ) {

        this._keys.push( key );

        if ( keyCode ){

            Key[ key ] = keyCode;

        } else {

            Key[ key ] = key.charCodeAt(0);

        }

    },

    /**
     *  variable number of objects can be used as parameter. On all of these objects
     *  controlsInput method will be called with controlsInput object as parameters. This object
     *  contains user input information. Its _controlsInput object of this class. After calling this
     *  method mouse relative movement is reset.
     *
     */
    update: function () {

        for ( var i = 0; i < this._keys.length; i++ ) {

            this._controlsInput[ this._keys[ i ] ] = Key.isDown( Key[ this._keys[ i ] ] );

        }

        for ( var i = 0; i < arguments.length; i++ ) {

            if ( arguments[ i ].controlsInput ) {

                arguments[ i ].controlsInput( this._controlsInput );

            }

        }

        this._controlsInput.movementX = 0;
        this._controlsInput.movementY = 0;

    }

};

