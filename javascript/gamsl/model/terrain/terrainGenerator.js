/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com>  on 6/30/2015.
 */

/**
 * Generates terrain. properties object is optional and may contain
 * settings:
 * properties = { gap:1 }
 * gap - space between vertices
 *
 * @param parameters
 * @constructor
 */

GAMSL.TerrainGenerator = function ( parameters ) {

    parameters = parameters || {};

    this._gap = parameters.gap !== undefined ? parameters.gap : 0.5;
    this._heightCoefficient
        = parameters.heightCoefficient !== undefined ? parameters.heightCoefficient : 0.15;



};

GAMSL.TerrainGenerator.prototype = {

    generateTerrainMeshFromTextures: function ( mapTexture, texture ) {

        var image = mapTexture.image;
        var canvasHelper = document.createElement( "canvas" );
        canvasHelper.width = image.naturalWidth;
        canvasHelper.height = image.naturalHeight;
        var ctx = canvasHelper.getContext("2d");

        ctx.drawImage( image, 0, 0 );

        var imageData = ctx.getImageData(
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        );

        var geometry = this._generateGeometryFromImageData(
            imageData,
            image.naturalWidth,
            image.naturalHeight
        );

        var material =  new THREE.MeshPhongMaterial();


        material.map = THREE.ImageUtils.loadTexture("imgs/Seamless_Beach_Sand_Texture.jpg");
        material.bumpMap = THREE.ImageUtils.loadTexture('imgs/Seamless_Beach_Sand_Texture_NORMAL.jpg');
        material.bumpScale = 1
        material.map.repeat.set( image.naturalWidth/2, image.naturalHeight/2);
        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
        material.map.format = THREE.RGBFormat;
        material.map.anisotropy = 16;
        material.shininess = 1;

        return new GAMSL.Terrain( geometry, material, this._gap, image.naturalWidth, image.naturalHeight );


    },

    _generateTriangles: function( width, height ){

        var arrayOfTriangles = new Array();

        for( var x = 0 ; x < width -1 ; x++){

            for( var y = 0; y < width -1 ; y++){

                var triangle = new Array();

                triangle.push( x*width + y );
                triangle.push( x*width + y + 1 );
                triangle.push( (x+1)*width + y );

                arrayOfTriangles.push(triangle);

                triangle = new Array();

                triangle.push(x*width + y + 1);
                triangle.push((x+1)*width + y +1);
                triangle.push((x+1)*width + y);

                arrayOfTriangles.push(triangle);

            }

        }

        return arrayOfTriangles;

    },

    _generateVertices: function ( imageData, width, height ) {

        var vertices = new Array();
        var vertex;
        var vertexHeight;

        for ( var x = 0; x < width; x++ ) {

            for ( var y = 0; y < height; y++ ) {

                vertexHeight = imageData.data[ x*width*4 + y*4 ];
                vertex = new THREE.Vector3(
                    x*this._gap,
                    vertexHeight * this._heightCoefficient,
                    y*this._gap
                )

                vertices.push( vertex );

            }

        }

        return vertices;

    },

    _generateGeometryFromImageData: function ( imageData, width, height ) {

        var geometry = new THREE.Geometry();

        geometry.vertices = this._generateVertices( imageData, width, height );
        var triangles = this._generateTriangles( width, height );


        for( var i = 0; i < triangles.length; i++ ){

            geometry.faces.push( new THREE.Face3( triangles[i][0], triangles[i][1], triangles[i][2] ));

        }

        geometry.mergeVertices();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        geometry.faceVertexUvs[0] = [];
        var faces = geometry.faces;
        for (var i = 0; i < geometry.faces.length ; i++) {

            var v1 = geometry.vertices[faces[i].a],
                v2 = geometry.vertices[faces[i].b],
                v3 = geometry.vertices[faces[i].c];
            geometry.faceVertexUvs[0].push(
                [
                    new THREE.Vector2( v1.x/(width*this._gap)  , v1.z/(height*this._gap) ),
                    new THREE.Vector2( v2.x/(width*this._gap) ,  v2.z/(height*this._gap) ),
                    new THREE.Vector2( v3.x/(width*this._gap)  , v3.z/(height*this._gap) )
                ]);

        }
        geometry.uvsNeedUpdate = true;
        geometry.computeTangents();

        return geometry;

    }

};