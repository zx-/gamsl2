/**
 * This object is meant as interface for GAMSL.Engine world object.
 * Created by Robert Cuprik<robertcuprik@hotmail.com> on 6/28/2015.
 */

GAMSL.ReferenceEngineObject = function(){

    /**
     * (OPTIONAL) if not present false is assumed.
     * Informs engine whether to apply gravity on this object.
     * @type {boolean}
     */
    this.isAffectedByGravity = true;

    /**
     * (OPTIONAL) if not present false is assumed.
     * Informs engine whether object is movable. If true speed must be defined.
     * @type {boolean}
     */
    this.isMovable = true;


    /**
     * (OPTIONAL) if not set false is assumed
     * Informs engine whether object can be entered a.k.a ignores any collision.
     * This is meant to be used for non visible event triggering objects.
     * @type {boolean}
     */
    this.isEnterable = false;

    /**
     * (SEMI-OPTIONAL) must be set if isMovable is true.
     * @type {THREE.Vector3}
     */
    this.speed = new THREE.Vector3();

    /**
     * Informs engine of object position;
     * @type {THREE.Vector3}
     */
    this.position = new THREE.Vector3();




};

GAMSL.ReferenceEngineObject.prototype = {

    /**
     * (OPTIONAL)
     * If this function is present. Engine will call it every tick.
     * Use this function for speed setup. Engine will move this object according to speed.
     * This method will be called after gravity adjustments.
     * @param elapsedTime
     */
    tick: function ( elapsedTime ){},


    /**
     * (OPTIONAL)
     * This method will be called with current user input generated using GAMSL.Controls via update method.
     * If u want to use this object use engines addControlsListener to register.
     * @param controlsInput
     */
    controlsInput: function ( controlsInput ){},


    // EVENTS TRIGGERED BY ENGINE
    // ALL OF THESE ARE OPTIONAL
    // MOVEMENT SHOULD BE MADE BY ENGINE AND NOT THESE


    //TODO Solution to touch between two objects being called multiple times.

    /**
     * (OPTIONAL)
     * This event is triggered by engine when object touches other object.
     * Second object will be passed as argument o.
     * @param o object with whom this is touching.
     */
    onTouch: function( o ){}

    /**
     * Other planned events are :
     * onExitTouch/onStartTouch instead of onTouch
     * onEnter/onLeave when isEnterable is set to true
     * onEnterDistance/onExitDistance when object is near other - there might be problem when
     * object are too far away. Engine might not even check their collision.
     * onSpeedChange for animating purposes - I don't know if necessary.
     */


};