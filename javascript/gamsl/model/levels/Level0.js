/**
 * Created by Gamer on 7/19/2015.
 */

GAMSL.LEVELS.Level0 = {

    blockDefaults: {

        isAffectedByGravity: false,
        isMovable: false,
        isEnterable: false,
        color: 0x70d9fb ,
        castShadow: true,
        receiveShadow: true

    },

    blockElements: [

        {
            position: new THREE.Vector3(0,0,0),
            width:50, height:10, depth:10,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(0,0,20),
            width:50, height:10, depth:10,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(17.5,0,40),
            width:15, height:10, depth:10,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(-17.5,0,40),
            width:15, height:10, depth:10,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(0,0,60),
            width:15, height:10, depth:10,
            props: {

            },
            functions: {

                tick: function ( elapsedTime ){

                    var dt = elapsedTime/1000;

                    GAMSL.LEVELS.rotations.rotationOnAxis(
                        this,
                        GAMSL.LEVELS.axes.z,
                        1,
                        dt
                    )

                }

            }

        },

        {
            position: new THREE.Vector3(0,0,95),
            width:15, height:10, depth:10,
            props: {

            },
            functions: {

                tick: function ( elapsedTime ){

                    var dt = elapsedTime/1000;

                    GAMSL.LEVELS.rotations.rotationOnAxis(
                        this,
                        GAMSL.LEVELS.axes.y,
                        1,
                        dt
                    )

                }

            }

        } ,
        {
            position: new THREE.Vector3(17.5,0,120),
            width:15, height:10, depth:10,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(-17.5,0,120),
            width:15, height:10, depth:10,
            props: {

            },
            functions: {

            }

        }

    ]



};