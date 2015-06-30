/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/30/2015.
 */

GAMSL.Terrain = function ( geometry, material, gap ) {

    THREE.Mesh.call( this, geometry, material );

    this.gap = gap;


};

GAMSL.Terrain.prototype = Object.create( THREE.Mesh.prototype );
GAMSL.Terrain.prototype.constructor = GAMSL.Terrain;
