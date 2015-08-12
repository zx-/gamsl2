/**
 * Created by mobilpc on 8/10/2015.
 */

GAMSL.LEVELS.LevelBasic = {

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
            position: new THREE.Vector3(0,-.50,0),
            width:150, height:1, depth:150,
            props: {
                castShadow: false,
            },
            functions: {
            },
            material: (function(){

                var material = new THREE.MeshPhongMaterial();


                material.map = THREE.ImageUtils.loadTexture("imgs/Seamless_Beach_Sand_Texture.jpg");
                material.bumpMap = THREE.ImageUtils.loadTexture('imgs/Seamless_Beach_Sand_Texture_NORMAL.jpg');
                material.bumpScale = 0.1;
                //map
                material.map.repeat.set( 10, 10);
                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
                material.map.format = THREE.RGBFormat;
                material.map.anisotropy =1;
                //bumpmap
                material.bumpMap.repeat.set( 10, 10);
                material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
                material.bumpMap.format = THREE.RGBFormat;
                material.bumpMap.anisotropy =1;

                material.shininess = 0;

                return material;

            })()
        },
        {
            position: new THREE.Vector3(0,0,75),
            width:150, height:15, depth:1,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(0,0,-75),
            width:150, height:15, depth:1,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(75,0,0),
            width:1, height:15, depth:150,
            props: {

            },
            functions: {
            }

        },
        {
            position: new THREE.Vector3(-75,0,0),
            width:1, height:15, depth:150,
            props: {

            },
            functions: {
            }

        }
    ]

}