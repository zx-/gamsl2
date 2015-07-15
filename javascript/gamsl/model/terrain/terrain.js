/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/30/2015.
 */

GAMSL.Terrain = function ( geometry, material, gap, width, height ) {

    THREE.Mesh.call( this, geometry, material );

    this.width = width;
    this.height = height;
    this.gap = gap;


};

GAMSL.Terrain.prototype = Object.create( THREE.Mesh.prototype );
GAMSL.Terrain.prototype.constructor = GAMSL.Terrain;

GAMSL.Terrain.prototype.collideWithSphere = function ( sphere, elapsed ) {

    var dt = elapsed / 1000;
    var sRelativePosition = sphere.position.clone();
    sRelativePosition.sub( this.position );

    var s = sphere.speed.clone();
    s.multiplyScalar( dt );

    sRelativePosition.add(s);

    var faces = this.getFacesByCoordinates( sRelativePosition );

    for ( var i = 0; i < faces.length; i++ ) {

        var face = faces[ i ];
        var v0 = this.geometry.vertices[ face.a ].clone();
        var v1 = this.geometry.vertices[ face.b ].clone();
        var v2 = this.geometry.vertices[ face.c ].clone();
        var sRelativePosToV = sRelativePosition.clone();

        v1.sub( v0 );
        v2.sub( v0 );
        sRelativePosToV.sub( v0 );

        var v1len = v1.length();
        var v2len = v2.length();
        v1.normalize();
        v2.normalize();
        var v1Dot = sRelativePosToV.dot( v1 );
        var v2Dot = sRelativePosToV.dot( v2 );

        var normal = new THREE.Vector3().crossVectors( v1, v2 );
        var normalDot = sRelativePosToV.dot( normal );

        if ( v1Dot >= 0 && v1Dot <= v1len &&
             v2Dot >= 0 && v2Dot <= v2Dot &&
             normalDot >= 0 && normalDot < sphere.geometry.parameters.radius &&
             sphere.speed.dot( normal ) < 0 ) {

            normal.multiplyScalar( -1 );
            normal.multiplyScalar( sphere.speed.dot( normal ) );
            sphere.speed.sub( normal );
            normal.multiplyScalar( -1 );

            sphere.speed.add( normal );
            sphere.speed.multiplyScalar(0.995);

            sphere.onTouch( this );

        }


    }


};

GAMSL.Terrain.prototype.getFacesByCoordinates = function ( coordinates ) {

    var pos = coordinates.clone();
    pos.multiplyScalar( 1/this.gap );

    pos.x = Math.floor( pos.x );
    pos.z = Math.floor( pos.z );

    var faces = [];

    if ( pos.x >= 0 && pos.x < this.width &&
        pos.z >= 0 && pos.z < this.height ) {

        faces.push( this.geometry.faces[ pos.x*(this.width-1)*2 + pos.z*2 ] );
        faces.push( this.geometry.faces[ pos.x*(this.width-1)*2 + pos.z*2 + 1 ] );

    }

    return faces;

};

