var Key = {
    _pressed: {},

    //LEFT: 37,
    //UP: 38,
    //RIGHT: 39,
    //DOWN: 40,
    LEFT:"A".charCodeAt(0),
    UP: "W".charCodeAt(0),
    RIGHT: "D".charCodeAt(0),
    DOWN: "S".charCodeAt(0),
    R: 82,

    _listeners :{
        click : function(keyCode,func){
            this.keys[keyCode] = {};
            this.keys[keyCode]['click'] = func;
            this.keys[keyCode]['click'].lock = false;
        },
        keys: {}
    },

    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    //TODO: Move click logic out of onKeyDown event
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
        if(this._listeners.keys[event.keyCode]){
            // has click Event
            if( this._listeners.keys[event.keyCode].click ){
                if (!this._listeners.keys[event.keyCode].click.lock){
                    this._listeners.keys[event.keyCode].click();
                    this._listeners.keys[event.keyCode].click.lock = true;
                }
            }
        }
    },

    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
        if(this._listeners.keys[event.keyCode]){
            // click Event
            if( this._listeners.keys[event.keyCode].click ){
                if (this._listeners.keys[event.keyCode].click.lock){
                    this._listeners.keys[event.keyCode].click.lock = false;
                }
            }
        }
    },
    addKeyEventListener: function (event,keyCode, func) {
        this._listeners[event](keyCode,func);

    }

};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
