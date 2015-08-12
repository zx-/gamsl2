/**
 * Created by Gamer on 7/19/2015.
 */


GAMSL.LEVELS = {

    axes: {
        x:new THREE.Vector3( 1, 0, 0 ),
        y:new THREE.Vector3( 0, 1, 0 ),
        z:new THREE.Vector3( 0, 0, 1 )
    },

    rotations: {

        /**
         * rotate elem around axis using rotation speed and elapsed dt
         * @param elem - element to rotate
         * @param axis - axis of rotations
         * @param dt - current dt
         * @param speed - speed of rotation
         */
        rotationOnAxis: function( elem, axis, speed, dt ) {

            elem.rotateOnAxis( axis, speed*dt );

        }

    },

    moves: {

        /**
         * moves element around point
         * @param elem
         * @param axis - normal
         * @param point
         * @param speed
         * @param dt
         */
        moveOnAxisAroundPoint: function ( elem, axis, point, speed, dt  ) {

            var relativePosition = new THREE.Vector3(0,0,0).subVectors( elem.position, point );
            relativePosition.applyAxisAngle( axis, speed*dt );

            elem.position = relativePosition.add( point );

        },

        /**
         * Set element position according to time \in <0;1> && SUM(times) = 1.
         * @param elem - element to move
         * @param points - array of THREE.Vector3 points
         * @param times  - array of times to spend between points. times.length = points.length-1
         * @param time - time in movement
         */
        moveBetweenPoints: function ( elem, points, times, u ) {

            var pIndex = 0;

            while( u > times[pIndex] ){

                u -= times[pIndex];
                pIndex++;

            }

            var relativeU = u / times[pIndex];

            var relPos = THREE.Vector3(0,0,0).subVectors( points[pIndex+1], points[pIndex] );
            relPos.multiplyScalar( relativeU );

            elem.position = points[pIndex].clone().add(relPos);

        }

    }

};