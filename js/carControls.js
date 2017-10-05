/**
 * CarControls class
 *
 * class responsible for handling a car object's movement.
 *
 * A car must be or inherit from THREE.Object3D or have the methods for translation and rotation
 * This class simulates some basic features and "physics" of a car movement
 *
 */


/**
 * Default constructor
 * @param car a 3d Object with methods for translation and rotation
 * @constructor
 */
function CarControls(car) {

    /**
     * car object reference
     */
    this.car = car;

    /**
     * clock to track time changes
     * @type {Clock|*}
     */
    this.updateClock = new THREE.Clock();

    /**
     * the current speed of the car; the number of units the car will move in a second
     * @type {number}
     */
    this.speed = 0;

    /**
     * current car acceleration; acceleration affects the increase rate of speed
     * @type {number}
     */
    this.acceleration = 0;

    /**
     * a limit to car's speed
     * @type {number}
     */
    this.maxSpeed = 300;

    /**
     * default acceleration when going forward or backwards
     * @type {number}
     */
    this.maxAcceleration = 10;

    /**
     * track the time since last change in movement
     * @type {number}
     */
    this.moveChangeTime = 0;

    /**
     * current movement angle/curve of the car
     * @type {number}
     */
    this.curveAngle = 0;



    /**
     * function to be called continuously in order to update car's movement gradually
     */
    this.updateMovement = function () {

        var timeSinceLastUpdate = this.updateClock.getDelta();
        this.moveChangeTime += timeSinceLastUpdate;
        var slowDown = 0;

        // simulates resistance
        if (this.acceleration === 0 && this.speed !== 0)
            slowDown = this.speed > 0 ? -5 : 5;

        //calculates new speed with physics movement formula v = vo + at ; with the addition of the resistance factor
        this.speed = (this.speed) + (this.acceleration * this.moveChangeTime) + slowDown * this.moveChangeTime;

        if (this.speed > this.maxSpeed)
            this.speed = this.maxSpeed;

        if (this.speed < -this.maxSpeed)
            this.speed = -this.maxSpeed;

        //applies space change to car; multiplies the speed by the time since last frame in order to get constant speed/s
        this.car.translateX(this.speed * timeSinceLastUpdate);


        //no movement means no rotation
        if (this.speed !== 0)
            this.car.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.curveAngle * timeSinceLastUpdate * (this.speed / this.maxSpeed));

    };



    /**
     * sets car motion forward
     * slows down car if car is going backwards
     */
    this.moveForward = function(){
        if(this.speed < 0){
            this.moveChangeTime = 0;
            this.stopMovement();
        }
        this.acceleration = this.maxAcceleration;
    };

    /**
     * sets car motion backwards
     * slows down car if car is going forward
     */
    this.moveBackwards = function(){

        if(this.speed > 0){
            this.moveChangeTime = 0;
            this.stopMovement();
        }

        this.acceleration = - this.maxAcceleration;
    };

    /**
     * slows greatly the car movement
     */
    this.stopMovement = function(){

        this.speed = this.speed/2;
        this.acceleration = 0;
        this.moveChangeTime = 0;

    };

    /**
     * stops car acceleration
     */
    this.slowDown = function(){
        this.acceleration = 0;
        this.moveChangeTime = 0;
    };

    /**
     * stops car curve
     */
    this.stopCurve = function(){
        this.curveAngle = 0;
    };

    /**
     * rotates/curves the car to the right
     */
    this.turnRight = function(){
        this.curveAngle = -(Math.PI/4) * 3;
    };

    /**
     * rotates/curves car to the left
     */
    this.turnLeft = function(){
        this.curveAngle = (Math.PI/4) * 3;
    };

}