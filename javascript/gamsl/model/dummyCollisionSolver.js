/**
 * This is dummy collision solver for sphere cube collisions.
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/28/2015.
 */

var GAMSL = GAMSL || {};

GAMSL.DummyCollisionSolver = function(){

    this._xAxis = new THREE.Vector4(1,0,0);
    this._yAxis = new THREE.Vector4(0,1,0);
    this._zAxis = new THREE.Vector4(0,0,1);

};

GAMSL.DummyCollisionSolver.prototype = {

    /**
     * Solves collision of o and his neighbour. This method should set speeds according to
     * collision and call appropriate events on both objects.
     * @param o - its considered sphere in this implementation  - THREE.SphereGeometry
     * @param neighbour - its considered cuboid ( 3d rectangle ) - THREE.BoxGeometry
     * @param elapsed - time elapsed
     */
    solveCollision: function ( o, neighbour, elapsed ) {

        // compute bounding sphere if needed
        if ( neighbour.geometry.boundingSphere === null ) {

            neighbour.geometry.computeBoundingSphere();

        }


        // check if collision is possible
        var distance = o.position.distanceTo( neighbour.position );
        if( distance - o.speed.length*elapsed - neighbour.geometry.boundingSphere.radius <= 0 ){

            //TODO This neighbours should be checked after objects that can change speed
            //TODO This can be inaccurate if other object changes speed. Engine object should manage it.

            var rotationMatrix = neighbour.matrixWorld;
            var inverseRotationMatrix = new THREE.Matrix4().getInverse( rotationMatrix );

            var positionRelative = new THREE.Vector4( o.position ).applyMatrix4( inverseRotationMatrix );
            var speedRelative = new THREE.Vector4( o.speed ).applyMatrix4( inverseRotationMatrix );

            var v3positionRelative = new THREE.Vector3(positionRelative);
            var v3speedRelative = new THREE.Vector3(speedRelative)


            if( neighbour.isEnterable ) {

                v3positionRelative.add( v3speedRelative.multiplyScalar( elapsed ) );
                var xDot = v3positionRelative.dot(this._xAxis);
                var yDot = v3positionRelative.dot(this._yAxis);
                var zDot = v3positionRelative.dot(this._zAxis);
                var nG = neighbour.geometry;
                var oG = o.geometry;

                if( ( xDot < nG.width + oG.radius && xDot > - oG.radius ) &&
                    ( yDot < nG.height + oG.radius && yDot > - oG.radius ) &&
                    ( zDot < nG.depth + oG.radius && zDot > - oG.radius ) ) {

                    if ( neighbour.onEnter ) {

                        neighbour.onEnter( o );

                    }

                }

            } else {



            }

        }

    }

};