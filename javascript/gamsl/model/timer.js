/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/27/2015.
 *
 * Calls tick method of every listener with elapsed time between ticks as argument.
 *
 */

GAMSL.Timer = function () {

    this._lastTime = 0;
    this._tickListeners = [];
    this._isEnabled = false;

};

GAMSL.Timer.prototype = {

    /**
     * Registers timer listener. tick method with elapsed time as argument will
     * be called every tick of given listener.
     * @param listener
     */
    addTickListener: function ( listener ) {

        this._tickListeners.push( listener );

    },

    start:  function () {

        if ( !this._isEnabled ) {

            this._isEnabled = true;
            this._lastTime = 0;
            this._tick();

        }

    },
    stop:   function () {

        this._isEnabled = false;

    },

    _tick:  function () {

        if ( this._isEnabled ) {

            requestAnimationFrame( this._tick.bind( this ) );

        }

        var timeNow = new Date().getTime();
        if ( this._lastTime != 0 ) {

            var elapsed = timeNow - this._lastTime;

            for (var i = 0; i < this._tickListeners.length; i++) {

                this._tickListeners.tick( elapsed );

            }


        }
        this._lastTime = timeNow;

    }

};


