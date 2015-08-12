/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/27/2015.
 */

GAMSL.Renderer = function ( timer ) {

    this._timer = timer;
    this._timer.addTickListener( this );

    this._el = document.getElementById( "web-gl-canvas" );
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera( 25, ( this._el.clientWidth-20 ) / ( this._el.clientHeight-20 ), 0.1, 1000 );
    this._renderer = new THREE.WebGLRenderer( { antialias:true } );
    this._renderer.setSize( this._el.clientWidth-20, this._el.clientHeight-20 );
    this._renderer.setClearColor( 0xdddddd, 1 );
    this._renderer.shadowMapSoft = true;
    this._renderer.shadowMapEnabled = true;
    this._renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this._el.appendChild( this._renderer.domElement );
    this.canvas = this._renderer.domElement;

};


GAMSL.Renderer.prototype = {

    setCamera: function ( camera ) {

        this._camera = new THREE.PerspectiveCamera( 75, this._el.clientWidth / this._el.clientHeight, 0.1, 1000 );

    },

    _render: function () {

        this._renderer.render( this._scene, this._camera );

    },

    tick: function ( elapsed ) {

        this._render();

    },

    addRenderable: function ( renderable ) {

        this._scene.add( renderable );

    },

    removeRenderable: function ( renderable ) {

        this._scene.remove( renderable );

    }


};