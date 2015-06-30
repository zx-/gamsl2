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

        var dt = elapsed / 1000;

        // compute bounding sphere if needed
        if ( neighbour.geometry.boundingSphere === null ) {

            neighbour.geometry.computeBoundingSphere();

        }


        // check if collision is possible
        var distance = o.position.distanceTo( neighbour.position );
        if ( distance - o.speed.length()*dt - neighbour.geometry.boundingSphere.radius <= 0 ){

            //TODO This neighbours should be checked after objects that can change speed
            //TODO This can be inaccurate if other object changes speed. Engine object should manage it.

            var rotationMatrix = neighbour.matrixWorld;
            var inverseRotationMatrix = new THREE.Matrix4().getInverse( rotationMatrix );

             // transform position and speed of o to be relative to neighbour
            var positionRelative = new THREE.Vector4(
                o.position.x,
                o.position.y,
                o.position.z,
                1
            );

            var speedRelative = new THREE.Vector4(
                o.speed.x,
                o.speed.y,
                o.speed.z,
                1
            );
            speedRelative.add( positionRelative );
            speedRelative.w = 1;
            speedRelative.applyMatrix4( inverseRotationMatrix );
            speedRelative.multiplyScalar( 1/speedRelative.w );

            positionRelative.applyMatrix4( inverseRotationMatrix );
            positionRelative.multiplyScalar( 1/positionRelative.w );
            speedRelative.sub( positionRelative );
            speedRelative.w = 1;

            var v3positionRelative = new THREE.Vector3(
                positionRelative.x,
                positionRelative.y,
                positionRelative.z
            );

            var v3speedRelative = new THREE.Vector3(
                speedRelative.x,
                speedRelative.y,
                speedRelative.z
            );

            v3positionRelative.add( v3speedRelative.clone().multiplyScalar( dt ) );
            var xDot = v3positionRelative.dot( this._xAxis );
            var yDot = v3positionRelative.dot( this._yAxis );
            var zDot = v3positionRelative.dot( this._zAxis );
            var nG = neighbour.geometry.parameters;
            var oG = o.geometry.parameters;

            if( neighbour.isEnterable ) {

                if ( ( xDot < nG.width/2 + oG.radius && xDot > - oG.radius - nG.width/2) &&
                     ( yDot < nG.height/2 + oG.radius && yDot > - oG.radius - nG.height/2 ) &&
                     ( zDot < nG.depth/2 + oG.radius && zDot > - oG.radius - nG.depth/2 ) ) {

                    if ( neighbour.onEnter ) {

                        neighbour.onEnter( o );

                    }

                }

            } else {

                if ( ( xDot < nG.width/2 + oG.radius && xDot > - oG.radius - nG.width/2) &&
                     ( yDot < nG.height/2 + oG.radius && yDot > - oG.radius - nG.height/2 ) &&
                     ( zDot < nG.depth/2 + oG.radius && zDot > - oG.radius - nG.depth/2 ) ) {

                    var collisionVector = new THREE.Vector3( 0, 0, 0 );

                    if ( xDot < -nG.width/2 ) collisionVector.x = -1;
                    if ( xDot > nG.width/2 ) collisionVector.x = 1;

                    if ( yDot < -nG.height/2 ) collisionVector.y = -1;
                    if ( yDot > nG.height/2 ) collisionVector.y = 1;

                    if ( zDot < -nG.depth/2 ) collisionVector.z = -1;
                    if ( zDot > nG.depth/2 ) collisionVector.z = 1;

                    collisionVector.normalize();
                    collisionVector.multiplyScalar( -1 );

                    if ( v3speedRelative.dot( collisionVector ) > 0 ) {

                        var normalSpeedDot = v3speedRelative.dot( collisionVector );
                        collisionVector.multiplyScalar( normalSpeedDot );

                        v3speedRelative.sub( collisionVector );
                        collisionVector.multiplyScalar( -1 );
                        v3speedRelative.add( collisionVector );

                        var v4speedNew = new THREE.Vector4(
                            v3speedRelative.x,
                            v3speedRelative.y,
                            v3speedRelative.z,
                            1
                        );

                        v4speedNew.add( positionRelative );
                        v4speedNew.w = 1;

                        v4speedNew.applyMatrix4( rotationMatrix );
                        v4speedNew.multiplyScalar( 1/v4speedNew.w );


                        positionRelative.applyMatrix4( rotationMatrix );
                        positionRelative.multiplyScalar( 1/positionRelative.w );

                        v4speedNew.sub( positionRelative );

                        o.speed = new THREE.Vector3(
                            v4speedNew.x,
                            v4speedNew.y,
                            v4speedNew.z
                        );

                        o.speed.multiplyScalar( 0.95 );
                        if ( o.speed.y > 0 ) {

                            o.speed.y *= 0.6;

                        }

                        if ( neighbour.onTouch ) {

                            neighbour.onTouch( o );

                        }

                        if ( o.onTouch ) {

                            o.onTouch( neighbour );

                        }

                    }

                }

            }

        }

    }

};