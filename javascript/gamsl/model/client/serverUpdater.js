/**
 * Created by Gamer on 8/11/2015.
 */

GAMSL.ServerUpdater = function ( connection, renderer, pGeo, npcGeo ) {

    this._con = connection;
    this._renderer = renderer;
    this._geometries = { player: pGeo, npc: npcGeo };

    this._con.registerMessageListener(
        "serverState",
        this._parseServerState.bind( this )
    );

    this._con.registerMessageListener(
        "playerJoined",
        this._playerJoined.bind( this )
    );

    this._con.registerMessageListener(
        "playerLeft",
        this._playerLeft.bind( this )
    );

    this._players = null;
    this._npcs = null;

    this._state = [];
    this._state[0] = null;
    this._state[1] = null;
};

/**
 * Sends player position and angle to server every 50 ms. "playerState" - msg name;
 * @param player
 */
GAMSL.ServerUpdater.prototype.updatePlayer = function ( player ) {

    var msg = {};
    msg.position = player.position;
    msg.angle = player.angle;

    this._con.sendToServer( "wantJoin" , msg );

    setInterval(function(){

        msg.position = player.position;
        msg.angle = player.angle;
        this._con.sendToServer( "playerState" , msg );

    }.bind(this), 50);

};

//{players:players,npcs:npcs}
GAMSL.ServerUpdater.prototype._parseServerState = function ( msg ) {

    if( this._npcs == null) {

        this._createNPCS( msg.npcs );

    }

    if( this._players == null) {

        this._createPlayers( msg.players );

    }
    msg.time = new Date().getTime();
    this._state[0] = this._state[1];
    this._state[1] = msg;

};

GAMSL.ServerUpdater.prototype.tick = function ( elapsed ) {

    if( this._state[ 0 ] != null && this._state[ 1 ] != null ) {

        for( var name in this._npcs ) {

            this._npcs[ name ].interpolationTick( elapsed, this._state );

        }

        for( var name in this._players ) {

            this._players[ name ].interpolationTick( elapsed, this._state );

        }

    }

};

GAMSL.ServerUpdater.prototype._playerJoined = function ( msg ) {

    if ( msg.playerId != this._con.getMyId() && this._players != null ) {

        this._createOtherPlayer( msg );

    }

};

GAMSL.ServerUpdater.prototype._playerLeft = function ( msg ) {

    this._renderer.removeRenderable( this._players[ msg ] );
    delete this._players[ msg ];

};

GAMSL.ServerUpdater.prototype._createPlayers = function ( players ) {

    this._players = {};
    for( var name in players ) {

        if ( players[ name ].playerId != this._con.getMyId() ) {

            this._createOtherPlayer( players[ name ] );

        }

    }


};

GAMSL.ServerUpdater.prototype._createOtherPlayer = function ( player ) {

    this._players[ player.playerId ] = new GAMSL.OtherPlayer(
        player,
        this._geometries.player.clone(),
        new THREE.MeshPhongMaterial()
    );

    this._players[ player.playerId ].scale.set(13,13,13);

    this._renderer.addRenderable( this._players[ player.playerId ] );

};

GAMSL.ServerUpdater.prototype._createNPCS = function ( npcs ) {

    this._npcs = {};

    for( var name in npcs ) {

        this._npcs[ name ] = new GAMSL.NPC(
            name,
            npcs[ name ],
            this._geometries.npc.clone(),
            new THREE.MeshPhongMaterial()
        );

        this._renderer.addRenderable( this._npcs[ name ] );

    }



};

