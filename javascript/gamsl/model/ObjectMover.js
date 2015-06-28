/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/27/2015.
 */

GAMSL.ObjectMover = function () {

    this._gravityAcc = new THREE.Vector3( 0, -2, 0 );
    this._collisionSorver = new GAMSL.DummyCollisionSolver();

};

GAMSL.ObjectMover.prototype = {

    _move: function ( o, elapsed ) {

        var dt = elapsed / 1000; // ms -> s

        var speed = o.speed.clone();

        speed.multiplyScalar(dt);
        o.position.add(speed);

    },

    _solveCollision: function ( o, neighbour, elapsed ) {

        this._collisionSorver.solveCollision( o, neighbour, elapsed );

    },

    /**
     * Moves object in world.
     * @param o
     * @param neighbours
     * @param elapsed
     */
    move: function ( o, neighbours, elapsed ) {

        if( !o.isMovable )
            return;

        for ( var i = 0; i < neighbours.length; i++ ) {

            this._solveCollision( o, neighbours[ i ], elapsed );

        }

        this._move( o, elapsed );

    },

    /**
     * Applies gravity to speed vector of object o.
     * @param o
     * @param elapsed
     */
    applyGravity: function ( o, elapsed ) {

        var dt = elapsed / 1000; // ms -> s
        var gravity = this._gravityAcc.clone();
        gravity.multiplyScalar(dt);

        o.speed.add(gravity);

    }

};

// if(o["onTouch"]) o["onTouch"](neighbour);