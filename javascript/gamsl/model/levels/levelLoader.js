/**
 * Created by Gamer on 7/19/2015.
 */

GAMSL.LEVELS.LevelLoader = function () {



};


GAMSL.LEVELS.LevelLoader.prototype = {

    loadlLevel: function ( level, engine, renderer ) {

        var blocks = level.blockElements;

        for( var i = 0; i < blocks.length; i++ ) {

            var block = blocks[ i ];
            var geometry = new THREE.BoxGeometry(
                block.width, block.height, block.depth, 1, 1, 1
            );

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            geometry.computeTangents();

            var color = block.color !== undefined ? block.color : level.blockDefaults.color;
            var material = block.material !== undefined ?
                block.material
                :new THREE.MeshPhongMaterial( {color:color} );

            var mesh = new THREE.Mesh( geometry,material );

            for( var prop in level.blockDefaults ) {

                mesh[ prop ] = level.blockDefaults[ prop ];

            }

            mesh.position.x = block.position.x;
            mesh.position.y = block.position.y;
            mesh.position.z = block.position.z;

            for( var prop in block.functions ) {

                mesh[ prop ] = block.functions[ prop ];

            }

            for( var prop in block.props ) {

                mesh[ prop ] = block.props[ prop ];

            }

            renderer.addRenderable( mesh );
            engine.registerObject( mesh );

        }

    }

};