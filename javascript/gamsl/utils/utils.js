/**
 * Created by Gamer on 7/19/2015.
 */

GAMSL.Utils = function () { };


GAMSL.Utils.prototype = {

    skyBoxTest: function ( renderer ) {
        // define path and box sides images
        var path = 'imgs/';
        var sides = [ path + 'sbox_px.jpg', path + 'sbox_nx.jpg', path + 'sbox_py.jpg', path + 'sbox_ny.jpg', path + 'sbox_pz.jpg', path + 'sbox_nz.jpg' ];

        // load images
        var scCube = THREE.ImageUtils.loadTextureCube(sides);
        scCube.format = THREE.RGBFormat;

        // prepare skybox material (shader)
        var skyShader = THREE.ShaderLib["cube"];
        skyShader.uniforms["tCube"].value = scCube;
        var skyMaterial = new THREE.ShaderMaterial( {
            fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
            uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
        });

        // create Mesh with cube geometry and add to the scene
        var skyBox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), skyMaterial);
        skyMaterial.needsUpdate = true;


        renderer.addRenderable(skyBox);

    },

    skyDomeTest: function ( renderer ) {

        // prepare ShaderMaterial
        var uniforms = {
            texture: { type: 't', value: THREE.ImageUtils.loadTexture('imgs/eso_dark.jpg') }
        };
        var skyMaterial = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            vertexShader: document.getElementById('sky-vertex').textContent, fragmentShader: document.getElementById('sky-fragment').textContent
        });

        // create Mesh with sphere geometry and add to the scene
        var skyBox = new THREE.Mesh(new THREE.SphereGeometry(700, 60, 40), skyMaterial);
        skyBox.scale.set(-1, 1, 1);
        skyBox.eulerOrder = 'XZY';
        skyBox.renderDepth = 500.0;


        renderer.addRenderable(skyBox);

    },

    loadStats: function ( timer ){

        var stats = new Stats();
        stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild( stats.domElement );
        stats.begin();

        timer.addTickListener({

            tick: function(elapsed){


                stats.end();
                stats.begin();


            }

        });

    }




};