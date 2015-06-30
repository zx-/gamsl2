/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/27/2015.
 */

var GAMSL = GAMSL || {};

GAMSL.Engine = function ( timer ) {

    this._timer = timer;
    this._timer.addTickListener( this );
    this._objects = [];
    this._objectMover = new GAMSL.ObjectMover();
    this._controlsListeneres = [];
    this._controls = null;
    this._terrain = null;

};


GAMSL.Engine.prototype = {

    _getObjectNeighbours: function ( o ) {

        return this._objects.filter( function( val ) { return val != o } );

    },
    /**
     * Meant to be called by timer.
     * @param elapsed
     */
    tick: function ( elapsed ) {

        var obj;

        if ( this._controls !== null ) {

            this._controls.update.apply( this._controls, this._controlsListeneres );

        }

        for ( var i = 0; i < this._objects.length; i++ ){

            obj = this._objects[ i ];

            if ( obj.isAffectedByGravity ) {

                this._objectMover.applyGravity( obj, elapsed );

            }

            if ( obj.tick ) {

                obj.tick( elapsed );

            }

        }

        for ( var i = 0; i < this._objects.length; i++ ){

            obj = this._objects[ i ];

            if ( this._terrain && obj.isMovable ) {

                this._terrain.collideWithSphere( obj, elapsed );

            }

            this._objectMover.move( obj, this._getObjectNeighbours( obj ), elapsed );

        }



    },

    start: function () {

        this._timer.start();

    },

    /**
     * Registers object to engine world.
     * This object should implement methods and properties of reference engine object.
     * GAMSL.ReferenceEngineObject
     * @param o object to be registered
     */
    registerObject: function ( o ) {

        this._objects.push( o );

    },

    registerTerrain: function ( terrain ) {

        this._terrain = terrain;

    },


    /**
     * This object will receive user controls input every tick using GAMSL.Controls update method.
     * @param o
     */
    addControlsListener: function ( o ) {

        this._controlsListeneres.push( o );

    },

    /**
     * Sets controls property. This object is meant to be of GAMSL.Controls hierarchy.
     * @param c
     */
    setControls: function ( c ) {

        this._controls = c;

    }

};
