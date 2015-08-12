/**
 * Created by Gamer on 8/12/2015.
 */

GAMSL.OtherPlayer = function ( message, geometry, material ) {


    THREE.Mesh.call( this, geometry, material );
    this._playerId = message.playerId;
    this._name = message.playerId;

    this.position.x = message.position.x;
    this.position.y = message.position.y;
    this.position.z = message.position.z;

    this.angle = new THREE.Vector3(0,0,0);
    this.angle.x = message.angle.x;
    this.angle.y = message.angle.y;
    this.angle.z = message.angle.z;

    this._yAxis = new THREE.Vector3( 0, 1, 0 );


};

GAMSL.OtherPlayer.prototype = Object.create( THREE.Mesh.prototype );
GAMSL.OtherPlayer.prototype.constructor = GAMSL.OtherPlayer;

GAMSL.OtherPlayer.prototype.interpolationTick = function ( elapsed, states ) {

    var currentTime = new Date().getTime();

    var timeDeltaStates = states[1].time - states[0].time;
    var delta = currentTime - states[1].time;



    var interp = delta/timeDeltaStates;

    this.position.x = states[0].players[ this._name ].position.x +
        interp * ( states[1].players[ this._name ].position.x - states[0].players[ this._name ].position.x );


    this.position.y = states[0].players[ this._name ].position.y +
        interp * ( states[1].players[ this._name ].position.y - states[0].players[ this._name ].position.y );


    this.position.z = states[0].players[ this._name ].position.z +
        interp * ( states[1].players[ this._name ].position.z - states[0].players[ this._name ].position.z );

    var relAngle;
    var s1 = states[0].players[ this._name ];
    var s2 = states[1].players[ this._name ];

    var s1angle = new THREE.Vector3(s1.angle.x,s1.angle.y,s1.angle.z);
    var s2angle = new THREE.Vector3(s2.angle.x,s2.angle.y,s2.angle.z);

    relAngle = s1angle.angleTo(s2angle);
    relAngle *= interp;

    s1angle.applyAxisAngle(this._yAxis,relAngle);



    relAngle = s1angle.angleTo(this.angle);

    this.rotateOnAxis( this._yAxis, relAngle );
    this.angle.applyAxisAngle( this._yAxis, relAngle );

};