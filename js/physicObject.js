/**
 * Class PhysicObject
 * This class intends to simulate basic physics for objects such as movement and collisions
 *
 *
 */

'use strict';



/**
 *
 * @constructor
 */
function PhysicObject(){
    THREE.Object3D.call(this);

    this.type = "PhysicObject";

    var self = this;
    this.mass = undefined;
    this.speed = 0;
    this.updateClock = new THREE.Clock();
    this.acceleration = 0;
    this.maxSpeed = 0;
    this.maxAcceleration = 0;
    this.curveAngle = 0;
    this.translationVector = new THREE.Vector3();
    this.rotationVector = new THREE.Vector3();
    this.slowFactor = 100;
    this.boundingSphereRadius = 0;


    this.animate = function(possibleCollisions){
        this.updateMovement(possibleCollisions);
    };


    this.updateMovement = function (possibleCollisions) {
        var timeSinceLastUpdate = this.updateClock.getDelta();


        var distance = this.calculateTranslation(timeSinceLastUpdate);
        var angle = this.calculateRotation(timeSinceLastUpdate);

        var moved = this.tryMovement(distance, this.translationVector, possibleCollisions);

        if(moved)
            this.applyRotation(angle);

    };



    this.tryMovement = function(distance, vector, possibleCollisions){
        var success = true;
        var selfPosition = new THREE.Vector3(this.position.x, this.position.y,this.position.z);

        vector = vector || this.translationVector;
        this.translateOnAxis(vector, distance);

        var collisions = this.findCollisions(possibleCollisions);

        if (collisions.length > 0){
            this.position.set(selfPosition.x, selfPosition.y, selfPosition.z);

            collisions.forEach(function(element){
                self.fixCollision(element);
            });
            success = false;
        }

        return success;
    };


    this.findCollisions = function(possibleCollisions){
        var collided = [];

        if( possibleCollisions === undefined){
            return collided;
        }

        possibleCollisions.forEach(function (element){
            if((element.type === "Orange" && self.type!=="Car") || (self.type === "Orange" && element.type==="Car"))
                return;
            if(element !== self && self.nearbyTo(element)){
                if(self.checkCollision(element)){
                    collided.push(element);
                }
            }
        });
        return collided;
    };


    this.nearbyTo = function (object, currentPosition){
        if(currentPosition === undefined){
            var selfPosition = self.getWorldPosition();
        }
        var objectPosition = object.getWorldPosition();
        var distanceSquared = selfPosition.distanceToSquared(objectPosition);

        return distanceSquared <= (self.boundingSphereRadius + object.boundingSphereRadius) * (self.boundingSphereRadius + object.boundingSphereRadius);

    };


    this.checkCollision = function(element){
        return this.pointInside(element);
    };


    this.pointInside = function(object){

        var a = new THREE.Box3().setFromObject(this);
        var b = new THREE.Box3().setFromObject(object);

        return (a.max.x >= b.min.x && a.min.x <= b.max.x &&
           a.max.y >= b.min.y && a.min.y <= b.max.y &&
           a.max.z >= b.min.z && a.min.z <= b.max.z );
    };



    this.fixCollision = function(object){

        // butter shouldn't move; objects which collide with butter lose their SPEED
        if ( object.type === "Butter" && this.type !== "Cheerio"){ this.speed = 0; return;}
        // Orange collision sends car to Start
        if ( object.type === "Orange" && this.type === "Car"){ this.returnToStart(); return;}
        if ( object.type === "Car" && this.type === "Orange"){ object.returnToStart(); return;}

        var m1 = this.mass;
        var m2 = object.mass;

        var selfPosition = this.getWorldPosition();
        var objectPosition = object.getWorldPosition();
        var objDir = new THREE.Vector3();
        var selfDir = new THREE.Vector3();

        objDir.x = objectPosition.x - selfPosition.x;
        objDir.z = objectPosition.z - selfPosition.z;

        selfDir.x = selfPosition.x - objectPosition.x ;
        selfDir.z = selfPosition.z - objectPosition.z ;

        //if 2 objects have same position give it a vector so it a direction doesn't get stuck and crash
        if(objDir.x === 0 && objDir.z === 0){ objDir.x = 1; objDir.z = 1;}

        objDir.normalize();
        selfDir.normalize();
        var oldSpeed1 = this.speed < 0 ? - this.speed : this.speed;
        var oldSpeed2 = object.speed < 0 ? - object.speed : object.speed;

        // m1 (v1)squared + m2 (v2)squared = m1 (v1')squared + m2 (v2')squared
        // by conservation of momentum and conservation of kinetic energy:
        // v1' = ( (m1 - m2) / (m1 + m2) ) v1 + ( (2 * m2 ) / ( m1 + m2) )v2   PHYSICS o/
        // v2' = ( (2 * m1 ) / (m1 + m2) ) v1 + ( (m2 - m1) / ( m1 + m2) )v2
        var newSpeed1 = ((( (m1 - m2) / (m1 + m2) )) * oldSpeed1 )+ ((( (2 * m2 ) / ( m1 + m2) )) * oldSpeed2);
        var newSpeed2 = ((( (2 * m1 ) / (m1 + m2) )) * oldSpeed1 )+ ((( (m2 - m1) / ( m1 + m2) )) * oldSpeed2);

        if( object.type !== "Car")
            object.translationVector = objDir;

        if( this.type!== "Car")
            this.translationVector = selfDir;

        object.speed = newSpeed2;
        this.speed = newSpeed1;
    };




    this.applyTranslation = function (distance, vector){
        if (vector === undefined)
            vector = this.translationVector;
        this.translateOnAxis(vector, distance);
    };

    this.applyRotation = function (angle, vector){
        if (vector === undefined)
            vector = this.rotationVector;
        this.rotateOnAxis(vector, angle);
    };



    this.calculateRotation = function(){
        throw "Calculate Translation not implemented";
    };


    this.calculateTranslation = function (timeSinceLastUpdate){

        var slowDown = 0;

        // simulates resistance
        if (this.acceleration === 0 && this.speed !== 0)
            slowDown = this.speed > 0 ? - this.slowFactor : this.slowFactor;

        //calculates new speed with physics movement formula v = vo + at ; with the addition of the resistance factor
        this.speed = (this.speed) + (this.acceleration * timeSinceLastUpdate) + (slowDown *timeSinceLastUpdate);

        if(this.speed > 0 && slowDown > 0  || this.speed < 0 && slowDown < 0)
            this.speed = 0;

        return this.speed * timeSinceLastUpdate;
    };

    this.calculateRotation = function(){
        return 0;
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


