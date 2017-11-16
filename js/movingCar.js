/**
 * CarControls class
 *
 * class responsible for handling a car object's movement.
 *
 * A car must be or inherit from THREE.Object3D or have the methods for translation and rotation
 * This class simulates some basic features and "physics" of a car movement as well as it's movement
 *
 */

'use strict';


function createMovingCar(x, y, z, properties){
	return new MovingCar(x, y, z, properties);
}


function MovingCar(x, y, z, properties) {

    BasicCar.call(this, x, y, z, properties);

    var self = this;
    this.type = "Car";
	this.mass = 1000;
	this.aabbMin = new THREE.Vector3(-7.5, 5, 2.7);
	this.aabbMax = new THREE.Vector3(7.5, 10, -2.7);
	this.boundingSphereRadius = 40;
	this.speed = 0;
	this.acceleration = 0;
	this.maxSpeed = 300;
	this.maxAcceleration = 100;
	this.curveAngle = 0;
	this.slowFactor = 100;
	this.translationVector = new THREE.Vector3(1,0,0);
    this.rotationVector = new THREE.Vector3(0, 1, 0);
    this.startX = 340;
    this.startY = 0;
    this.startZ = -50;
    var xVector = new THREE.Vector3(1,0,0);
    this.timeSinceLastDeath = 0;

    

    this.stuckWithPreviousCollision = function (distance, vector, possibleCollisions){
        var temp = this.findCollisions(possibleCollisions);
        var foundOrange = false;
        temp.forEach(function(ele){
            if (ele.type ==="Orange")
                foundOrange = true;
        });
        if ( temp.length > 0 && !foundOrange){
            this.applyTranslation(distance, vector);
            return true;
        }
        return false;
	};


    this.animate = function (possibleCollisions, delta) {
        this.timeSinceLastDeath += delta;
        this.updateMovement(possibleCollisions, delta);
    };


    this.calculateTranslation = function (timeSinceLastUpdate){

        var slowDown = 0;

        // simulates resistance
        if (this.acceleration === 0 && this.speed !== 0)
            slowDown = this.speed > 0 ? - this.slowFactor : this.slowFactor;

        //calculates new speed with physics movement formula v = vo + at ; with the addition of the resistance factor
        this.speed = (this.speed) + (this.acceleration * timeSinceLastUpdate) + (slowDown *timeSinceLastUpdate);
        this.collisionSpeed = (this.collisionSpeed) - (this.slowFactor/10);

        if(this.speed > 0 && slowDown > 0  || this.speed < 0 && slowDown < 0)
            this.speed = 0;

        if(this.collisionSpeed < 0 )
        	this.collisionSpeed = 0;

		if (this.speed > this.maxSpeed)
            this.speed = this.maxSpeed;

        if (this.speed < - this.maxSpeed)
            this.speed = - this.maxSpeed;

        //applies space change to car; multiplies the speed by the time since last frame in order to get the distance to move

        return [this.speed * timeSinceLastUpdate, this.collisionSpeed * timeSinceLastUpdate];
	};

	this.calculateRotation = function(timeSinceLastUpdate){
		var speedFactor = this.speed*2 / this.maxSpeed;
		speedFactor = speedFactor > 1 ? 1 : speedFactor;
        return this.curveAngle * timeSinceLastUpdate * speedFactor;
	};


    this.applyTranslation = function (distance, vector){

    	if(Array.isArray(distance)){
      		var collisionSpeed = distance[1];
      		distance = distance[0];
		}

    	if(this.collisionSpeed && this.collisionVector)
      	 	this.translateOnAxis(this.collisionVector, collisionSpeed);

        if (vector === undefined)
            vector = this.translationVector;
        this.translateOnAxis(vector, distance);
    };

	/**
	 * sets car motion forward
	 * slows down car if car is going backwards
	 */
	this.moveForward = function(){
		if(this.speed < 0){
			this.stopMovement();
		}
		this.acceleration = this.maxAcceleration;
		this.translationVector = xVector;
	};

	/**
	 * sets car motion backwards
	 * slows down car if car is going forward
	 */
	this.moveBackwards = function(){

		if(this.speed > 0){
			this.stopMovement();
		}

		this.acceleration = - this.maxAcceleration;
		this.translationVector = xVector;
	};

	/**
	 * slows greatly the car movement
	 */
	this.stopMovement = function(){

		this.speed = (this.speed/3) * 2;
		this.acceleration = 0;
        this.translationVector = xVector;

    };

	/**
	 * stops car acceleration
	 */
	this.slowDown = function(){
		this.acceleration = 0;
        this.moveChangeTime = 0;
        this.translationVector = xVector;

    };

	/**
	 * stops car curve
	 */
	this.stopCurve = function(){
		this.curveAngle = 0;
        this.translationVector = xVector;

    };

	/**
	 * rotates/curves the car to the right
	 */
	this.turnRight = function(){
		this.curveAngle = -(Math.PI/4) * 3;
        this.translationVector = xVector;

    };

	/**
	 * rotates/curves car to the left
	 */
	this.turnLeft = function(){
		this.curveAngle = (Math.PI/4) * 3;
	};


	this.processOutOfBounds = function(){
		this.returnToStart();
	};

	this.isAtStart = function(){
		return (this.position.x === this.startX &&
				this.position.y === this.startY &&
				this.position.z === this.startZ)
	};

	this.canDie = function(){

		return this.timeSinceLastDeath > 3;
	}
}


/**
 * adds to BasicCar class all method and attributes
 */
MovingCar.prototype = Object.create(BasicCar.prototype);

/**
 * prevents issues with isInstance after BasiCar inheritance from THREE.Object3D
 */
MovingCar.prototype.constructor = MovingCar;

MovingCar.prototype.returnToStart = function(){
	this.position.set(this.startX,this.startY, this.startZ);
	this.lookAt(new THREE.Vector3(0,0,0));
	this.speed = 0;
	this.acceleration = 0;
	this.curveAngle = 0;
};

MovingCar.prototype.getAabbMin = function(){
	return this.aabbMin.x;
};

MovingCar.prototype.resetBoundingBox = function(){
	this.aabbMin = new THREE.Vector3(-32.5, -12.5, -17.5);
	this.aabbMax = new THREE.Vector3(32.5, 12.5, 17.5);
};