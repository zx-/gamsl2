/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/28/2015.
 */

GAMSL.Player = function ( geometry, material, camera ) {

    THREE.Mesh.call( this, geometry, material );


    this.isAffectedByGravity = true;
    this.isMovable = true;
    this.isEnterable = false;
    this.speed = new THREE.Vector3();
    this.camera = camera;
    this._controls;
    this._cameraX = 0;
    this._cameraY = 0;
    this.cameraRadius = 10;

    this.cursor = new THREE.Mesh(
        new THREE.SphereGeometry(.1, 8, 8 ),
        new THREE.MeshBasicMaterial({color:0xFF0000})
    );

    this.cursor.position.z = 1;
    this.cursor.position.y = 3;

    this.angle = new THREE.Vector3( 0, 0, 1 );
    this._yAxis = new THREE.Vector3( 0, 1, 0 );


    this._maxSpeed = 15;


};

GAMSL.Player.prototype = Object.create( THREE.Mesh.prototype );
GAMSL.Player.prototype.constructor = GAMSL.Player;
/**
 * Used by GAMSL.Controls update function
 * @param controlsInput
 */
GAMSL.Player.prototype.controlsInput = function ( controlsInput ){

    this._cameraX -= controlsInput.movementX;
    this._cameraY -= controlsInput.movementY;

    this._cameraY = this._cameraY >= 700? 700:this._cameraY;
    this._cameraY = this._cameraY <= -200? -200:this._cameraY;

    this._controls = controlsInput;

};
/*
GAMSL.Player.prototype.tick = function ( elapsed ) {

    var dt = elapsed / 1000;

    var cameraToBall = new THREE.Vector3(0,0,0);
    cameraToBall = cameraToBall.subVectors(this.position, this.camera.position);
    cameraToBall.y = 0;
    cameraToBall.normalize();
    cameraToBall.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI/2 );
    var cpy = cameraToBall.clone();

    if(this._controls.LEFT) {

        cpy.multiplyScalar(dt).multiplyScalar( 10 );
        this.speed.add(cpy);

    }
    cpy = cameraToBall.clone();

    if(this._controls.RIGHT){

        cpy.multiplyScalar(-dt).multiplyScalar( 10 );
        this.speed.add(cpy);

    }

    cameraToBall.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI/2 );
    cpy = cameraToBall.clone();

    if(this._controls.UP) {

        cpy.multiplyScalar(dt).multiplyScalar( 10 );
        this.speed.add(cpy);

    }

    cpy = cameraToBall.clone();
    if(this._controls.DOWN){

        cpy.multiplyScalar(-dt).multiplyScalar( 10 );
        this.speed.add(cpy)

    }

    if(this._controls.SPACE && this._touch){

        this.speed.y += 5;

    }
    this._touch = false;

    if(this._controls.R){

        this.position.x = 0;
        this.position.y = 20;
        this.position.z = 0;
        this.speed = new THREE.Vector3();

    }


};

GAMSL.Player.prototype.onTouch = function ( o ) {

    this._touch = true;

};

GAMSL.Player.prototype.onMove = function () {

    this.camera.position.x = this.position.x + this.cameraRadius * Math.sin( this._cameraX/1000 );
    this.camera.position.z = this.position.z + this.cameraRadius * Math.cos( this._cameraX/1000 );
    this.camera.position.y = this.position.y + 5;

    var lookAt = new THREE.Vector3(
        this.position.x,
        this.position.y + this._cameraY/100,
        this.position.z
    )

    this.camera.lookAt( lookAt );

};
*/
GAMSL.Player.prototype.onTouch = function ( o ) {

    this._touch = true;

};

GAMSL.Player.prototype.tick = function ( elapsed ) {

    var dt = elapsed / 1000;
    this._touch = false;
    var acc = dt*25;

    if ( this._controls.LEFT ) {

        this.speed.z+= acc;

    }

    if ( this._controls.RIGHT ) {

        this.speed.z-= acc;

    }

    if ( !this._controls.LEFT && !this._controls.RIGHT  ) {

        this.speed.z*=0.8;

    }

    if ( this._controls.UP ) {

        this.speed.x-= acc;

    }

    if ( this._controls.DOWN ) {

        this.speed.x+= acc;

    }

    if ( !this._controls.UP && !this._controls.DOWN  ) {

        this.speed.x*=0.8;

    }

    if( this.speed.length() > this._maxSpeed ) {

        this.speed.normalize().multiplyScalar(this._maxSpeed);

    }

    this.cursor.position.x -= this._cameraY/100;
    this.cursor.position.z += this._cameraX/100;

    this._cameraY = 0;
    this._cameraX = 0;



}

GAMSL.Player.prototype.onMove = function ( move ) {

    this.camera.position.x = this.position.x+20;
    this.camera.position.z = this.position.z;
    this.camera.position.y = this.position.y+60;
    this.camera.lookAt( this.position );

    this.cursor.position.add( move );

    this.calculateRotationOnCursor();

};

GAMSL.Player.prototype.calculateRotationOnCursor = function () {

    var relPosCursor = new THREE.Vector3(0,0,0).subVectors(this.cursor.position, this.position);
    relPosCursor.y = 0;

    relPosCursor.normalize();

    var relAngle = 1;
    var counter = 0;


    var relAngle = 1;
    var count = 0;

    while( relAngle != 0 && count++ < 15) {

        relAngle = relPosCursor.angleTo(this.angle);
        this.rotateOnAxis(this._yAxis, relAngle);
        this.angle.applyAxisAngle(this._yAxis, relAngle);

    }

};