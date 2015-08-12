/**
 * Created by Gamer on 8/12/2015.
 */

GAMSL.NPC = function ( name, position, geometry, material ) {


    THREE.Mesh.call( this, geometry, material );
    this._name = name;
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;


};

GAMSL.NPC.prototype = Object.create( THREE.Mesh.prototype );
GAMSL.NPC.prototype.constructor = GAMSL.NPC;

GAMSL.NPC.prototype.interpolationTick = function ( elapsed, states ) {

    var currentTime = new Date().getTime();

    var timeDeltaStates = states[1].time - states[0].time;
    var delta = currentTime - states[1].time;



    var interp = delta/timeDeltaStates;

    this.position.x = states[0].npcs[ this._name ].x +
        interp * ( states[1].npcs[ this._name ].x - states[0].npcs[ this._name ].x );


    this.position.y = states[0].npcs[ this._name ].y +
        interp * ( states[1].npcs[ this._name ].y - states[0].npcs[ this._name ].y );


    this.position.z = states[0].npcs[ this._name ].z +
        interp * ( states[1].npcs[ this._name ].z - states[0].npcs[ this._name ].z );



};