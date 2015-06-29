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
    this.cameraRadius = 10;

};

GAMSL.Player.prototype = Object.create( THREE.Mesh.prototype );
GAMSL.Player.prototype.constructor = GAMSL.Player;

GAMSL.Player.prototype.controlsInput = function ( controlsInput ){

    this._cameraX -= controlsInput.movementX;
    this._controls = controlsInput;

};

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

};

GAMSL.Player.prototype.onTouch = function ( o ) {

    this._touch = true;

};

GAMSL.Player.prototype.onMove = function () {

    this.camera.position.x = this.position.x + this.cameraRadius * Math.sin( this._cameraX/1000 );
    this.camera.position.z = this.position.z + this.cameraRadius * Math.cos( this._cameraX/1000 );
    this.camera.position.y = this.position.y + 10;
    this.camera.lookAt( this.position );

};
