/**
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/26/2015.
 */

var GAMSL = GAMSL || {};

GAMSL.Model = function ( engine ) {

    this._engine = engine;

};

GAMSL.Model.prototype = {

    start: function () {

        this._engine.start();

    }

};