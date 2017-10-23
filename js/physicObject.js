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
    this.slowFactor = 10;
    this.boundingSphereRadius = 0;


    this.nearbyTo = function (object, currentPosition){
        if(currentPosition === undefined){
            var selfPosition = self.getWorldPosition();
        }
        var objectPosition = object.getWorldPosition();
        var distanceSquared = selfPosition.distanceToSquared(objectPosition);

        return distanceSquared <= (self.boundingSphereRadius + object.boundingSphereRadius) * (self.boundingSphereRadius + object.boundingSphereRadius);

    };

    this.pointInside = function(object){

        var a = new THREE.Box3().setFromObject(this);
        var b = new THREE.Box3().setFromObject(object);


        /*this.updateMatrixWorld();
        var aMin = this.localToWorld(new THREE.Vector3(this.aabbMin.x, this.aabbMin.y, this.aabbMin.z));
        var aMax = this.localToWorld(new THREE.Vector3(this.aabbMax.x, this.aabbMax.y, this.aabbMax.z));

        object.updateMatrixWorld();
        var bMin = object.localToWorld(new THREE.Vector3(object.aabbMin.x, object.aabbMin.y, object.aabbMin.z));
        var bMax = object.localToWorld(new THREE.Vector3(object.aabbMax.x, object.aabbMax.y, object.aabbMax.z));
        */
        if(a.max.x >= b.min.x && a.min.x <= b.max.x &&
           a.max.y >= b.min.y && a.min.y <= b.max.y &&
           a.max.z >= b.min.z && a.min.z <= b.max.z )
            return true;
        else
            return false;
    };

    this.fixCollision = function(object){

        var m1 = this.mass;
        var m2 = object.mass;

        if (object.type === "Butter" && this.type !== "Cheerio"){
            this.speed = 0;
            return;
        }

        var selfPosition = this.getWorldPosition();
        var objectPosition = object.getWorldPosition();
        var objDir = new THREE.Vector3();

        objDir.x = objectPosition.x - selfPosition.x;
        objDir.z = objectPosition.z - selfPosition.z;

        if(objDir.x === 0 && objDir.z === 0){
            objDir.x = 1;
            objDir.z = 1;
        }

        objDir.normalize();
        object.translationVector = objDir;

        var oldSpeed1 = this.speed < 0 ? - this.speed : this.speed;

        var oldSpeed2 = object.speed < 0 ? - object.speed : object.speed;
        var newSpeed1 = (( (m1 - m2) / (m1 + m2) ) * oldSpeed1 )+ (( (2 * m2 ) / ( m1 + m2) )* oldSpeed2);

        var newSpeed2 = (( (2 * m1 ) / (m1 + m2) ) * oldSpeed1 )+ (( (m2 - m1) / ( m1 + m2) ) * oldSpeed2);
        this.speed = this.speed < 0 ? - newSpeed1 : newSpeed1;


        object.speed = newSpeed2;
        object.updateMovement();
    };


    this.checkCollision = function(element){
        return this.pointInside(element);
    };


    this.findCollisions = function(possibleCollisions){
        var collided = [];

        if( possibleCollisions === undefined){
            return collided;
        }

        possibleCollisions.forEach(function (element){
            // if((element.type === "Butter" && self.type==="Cheerio") || (self.type === "Butter" && element.type==="Cheerio"))
            //     return;
            if(element !== self && self.nearbyTo(element)){
                if(self.checkCollision(element)){
                    collided.push(element);
                }
            }
        });
        return collided;
    };


    this.tryMovement = function(distance, vector, possibleCollisions){
        var selfPosition = new THREE.Vector3(this.position.x, this.position.y,this.position.z);

        vector = vector || this.translationVector;
        this.translateOnAxis(vector, distance);

        var collisions = this.findCollisions(possibleCollisions);

        if (collisions.length > 0){
            this.position.set(selfPosition.x, selfPosition.y, selfPosition.z);

            collisions.forEach(function(element){
                self.fixCollision(element);
            });
        }

    };



    this.animate = function(possibleCollisions){
        this.updateMovement(possibleCollisions);
    };



    this.updateMovement = function (possibleCollisions) {
        var timeSinceLastUpdate = this.updateClock.getDelta();

        var distance = this.calculateTranslation(timeSinceLastUpdate);
        this.tryMovement(distance, this.translationVector, possibleCollisions);

        var angle = this.calculateRotation(timeSinceLastUpdate);
        this.applyRotation(angle);

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


























/*
old code






    this.animate = function(possibleCollisions){

        //var selfPosition = {x : this.position.x, y : this.position.y, z: this.position.z};

        this.updateMovement(possibleCollisions);

        // while( this.hasCollisions(possibleCollisions)){
        //     this.position.set(selfPosition.x, selfPosition.y, selfPosition.z);
        //     selfPosition = {x : this.position.x, y : this.position.y, z: this.position.z};
        //     this.updateMovement();
        // }

    };



    this.calculateCollision = function(element, possibleCollisions){

        return this.applyCollision(element);

    };


    // m1 (v1)squared + m2 (v2)squared = m1 (v1')squared + m2 (v2')squared
    // by conservation of momentum and conservation of kinetic energy:
    // v1' = ( (m1 - m2) / (m1 + m2) ) v1 + ( (2 * m2 ) / ( m1 + m2) )v2
    // v2' = ( (2 * m1 ) / (m1 + m2) ) v1 + ( (m2 - m1) / ( m1 + m2) )v2
    this.applyCollision = function(object){

        var m1 = this.mass;
        var m2 = object.mass;

        var selfPosition = this.getWorldPosition();
        var objectPosition = object.getWorldPosition();
        var objDir = new THREE.Vector3();

        if (object.type === "Butter"){
            this.speed = -this.speed/this.speed;
            return true;
        }

        if( this.type === "Butter"){
            object.speed = -object.speed/object.speed;
            return true;
        }



        objDir.x = objectPosition.x - selfPosition.x;
        objDir.z = objectPosition.z - selfPosition.z;

        if(objDir.x === 0 && objDir.z === 0){
            objDir.x = 1;
            objDir.z = 1;
        }

        objDir.normalize();
        object.translationVector = objDir;

        var oldSpeed1 = this.speed < 0 ? - this.speed : this.speed;

        var oldSpeed2 = object.speed < 0 ? - object.speed : object.speed;
        var newSpeed1 = (( (m1 - m2) / (m1 + m2) ) * oldSpeed1 )+ (( (2 * m2 ) / ( m1 + m2) )* oldSpeed2);

        var newSpeed2 = (( (2 * m1 ) / (m1 + m2) ) * oldSpeed1 )+ (( (m2 - m1) / ( m1 + m2) ) * oldSpeed2);
        this.speed = this.speed < 0 ? - newSpeed1 : newSpeed1;


        object.speed = newSpeed2;
        object.applyTranslation(7);
        return true;
    };

    this.hasCollisions = function(objectList){

        var collided = false;
        objectList.forEach(function (element){
            // if((element.type === "Butter" && self.type==="Cheerio") || (self.type === "Butter" && element.type==="Cheerio"))
            //     return;
            if(element !== self && self.nearbyTo(element)){
                if(self.calculateCollision(element, objectList)){
                    collided = true;
                }
            }
        });

        return collided;
    };



 */