/**
 * Class PhysicObject
 * This class intends to simulate basic physics for objects such as movement and colisions
 * WARNING: Pay attention to which methods and attributes you want to override in order to use this class
 *
 * Usage:
 * Override calculateTranslation and calculateRotation methods
 *
 */

'use strict';



/**
 *
 * @constructor
 */
function PhysicObject(){
    THREE.Object3D.call(this);


    this.speed = 0;
    this.updateClock = new THREE.Clock();
    this.acceleration = 0;
    this.maxSpeed = 0;
    this.maxAcceleration = 0;
    this.moveChangeTime = 0;
    this.curveAngle = 0;
    this.translationVector = new THREE.Vector3(1,0,0);
    this.rotationVector = new THREE.Vector3(0, 1, 0);


    this.animate = function(){
        this.updateMovement();
    };

    this.calculateTranslation = function(){
        throw "Calculate Translation not implemented";
    };

    this.calculateRotation = function(){
        throw "Calculate Translation not implemented";
    };


    this.updateMovement = function () {
        var timeSinceLastUpdate = this.updateClock.getDelta();

        var distance = this.calculateTranslation(timeSinceLastUpdate);
        this.applyTranslation(distance);

        var angle = this.calculateRotation(timeSinceLastUpdate);
        this.applyRotation(angle);
    };

    this.applyTranslation = function (distance){
        this.translateOnAxis( this.translationVector, distance)
    };

    this.applyRotation = function (angle){
        this.rotateOnAxis(this.rotationVector, angle);
    };

}

/**
 * adds to BasicCar class all method and attributes
 */
PhysicObject.prototype = Object.create(THREE.Object3D.prototype);

/**
 * prevents issues with isInstance after BasiCar inheritance from THREE.Object3D
 */
PhysicObject.prototype.constructor = PhysicObject;


