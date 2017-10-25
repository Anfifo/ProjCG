'use strict';


function CarF1 (x,y,z, properties){
    // size é um multiplicador do tamanho original (+/- 9.5)

    PhysicObject.call(this);

    this._size = 1.5;
    this.type = "Car";


    var size = this._size;
    var car = new THREE.Object3D();


    this.triangleGeometry = function(comp, alt, width) {

        var triangle = new THREE.Shape();

        triangle.moveTo(0, 0);
        triangle.lineTo(comp, 0);
        triangle.lineTo(comp, alt);

        var extrudeSettings = { //  transforma uma figura 2D em 3D
            steps: 1,
            amount: width,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry(triangle, extrudeSettings);
        geometry.center();
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material) ;

        return mesh;
    };

    this.addTriangleGeometry = function(obj, comp, alt, width, x, y, z, rotx, roty, rotz) {
        var mesh = this.triangleGeometry(comp, alt, width);

        mesh.rotation.set(rotx, roty, rotz);
        mesh.position.set(x + (comp / 2), y + (alt / 2), z);

        obj.add(mesh);
    };

    this.addCarWing = function(obj, x, y, z) {
        var geometry = new THREE.BoxGeometry(1, 0.25, 5);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };

    this.addCarWingSup = function(obj, x, y, z) {
        var geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotateZ(-Math.PI / 6);

        obj.add(mesh);
    };

    this.addCarEixoFront = function(obj, x, y, z) {
        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 10);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotateX(Math.PI / 2);

        obj.add(mesh);
    };

    this.addCarEixoBack = function(obj, x, y, z) {
        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 10);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotateX(Math.PI/2);

        obj.add(mesh);
    };

    this.addCarBack = function(obj, x, y, z) {
        var geometry = new THREE.BoxGeometry(1.5, 0.5, 3);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };

    this.addCarChassi = function(obj, x, y, z) {
        var geometry = new THREE.BoxGeometry(6, 0.5, 2);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };

    this.addCarWheel = function(obj, x, y, z) {
        var geometry = new THREE.TorusGeometry(0.5, 0.2, 10, 75);
        var material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };



    this.addCarWheel(car, 2, 0, 2);
    this.addCarWheel(car, 2, 0, -2);
    this.addCarWheel(car, 7.75, 0, 2);
    this.addCarWheel(car, 7.75, 0, -2);
    this.addCarChassi(car, 4, 0, 0);
    this.addCarBack(car, 7.75, 0, 0);
    this.addCarEixoFront(car, 2, 0, 1.5);
    this.addCarEixoFront(car, 2, 0, -1.5);
    this.addCarEixoBack(car, 7.75, 0, 1.75);
    this.addCarEixoBack(car, 7.75, 0, -1.75);

    //triangulo parachoques
    this.addTriangleGeometry(car, 1, 0.5, 4, 0, -0.25, 0, 0, 0, 0); // addTriangleGeometry(obj, comprimento, altura, profundidade, posx, posy, posz, rotx, roty, rotz)

    //triangulo condutor
    this.addTriangleGeometry(car, 4.75, 0.75, 2, 2.25, 0.25, 0, 0, 0, 0);

    //triangulo trazeiro
    this.addTriangleGeometry(car, 1.5, 0.75, 3, 7, 0.25, 0, 0, Math.PI, 0);

    //triangulos laterais
    this.addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, -1.25, -Math.PI/2,0,0);
    this.addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, 1.25, Math.PI/2,0,0);

    this.addCarWingSup(car, 8, 0.75, 1);
    this.addCarWingSup(car, 8, 0.75, -1);
    this.addCarWing(car, 8, 1, 0);

    car.castShadow = true;
    car.position.set(x, y + 0.7 * size, z); // y + 0.7 por causa do raio da roda
    car.scale.set(size, size, size);
    car.rotateY(Math.PI);

    this.add(car);

}


/**
 * adds to Orange class all method and attributes from THRE.Object3D
 */
CarF1.prototype = Object.create(PhysicObject.prototype);

/**
 * prevents issues with isInstance after Orange inheritance from THREE.Object3D
 */
CarF1.prototype.constructor = CarF1;







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


function createMovingCar2(x, y, z, properties){
    return new MovingCar2(x, y, z, properties);
}


function MovingCar2(x, y, z, properties) {

    CarF1.call(this, x, y, z, properties);

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
    var xVector = new THREE.Vector3(1,0,0);

    this.scale.set(3,3,3);



    this.calculateTranslation = function (timeSinceLastUpdate){

        var slowDown = 0;

        // simulates resistance
        if (this.acceleration === 0 && this.speed !== 0)
            slowDown = this.speed > 0 ? - this.slowFactor : this.slowFactor;

        //calculates new speed with physics movement formula v = vo + at ; with the addition of the resistance factor
        this.speed = (this.speed) + (this.acceleration * timeSinceLastUpdate) + (slowDown *timeSinceLastUpdate);

        if(this.speed > 0 && slowDown > 0  || this.speed < 0 && slowDown < 0)
            this.speed = 0;

        if (this.speed > this.maxSpeed)
            this.speed = this.maxSpeed;

        if (this.speed < - this.maxSpeed)
            this.speed = - this.maxSpeed;

        //applies space change to car; multiplies the speed by the time since last frame in order to get the distance to move

        return this.speed * timeSinceLastUpdate;
    };

    this.calculateRotation = function(timeSinceLastUpdate){
        return this.curveAngle * timeSinceLastUpdate * (this.speed / this.maxSpeed);
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

}


/**
 * adds to BasicCar class all method and attributes
 */
MovingCar2.prototype = Object.create(CarF1.prototype);

/**
 * prevents issues with isInstance after BasiCar inheritance from THREE.Object3D
 */
MovingCar2.prototype.constructor = MovingCar2;

MovingCar2.prototype.returnToStart = function(){
    this.position.set(340,0, -50);
    this.lookAt(new THREE.Vector3(0,0,0));
    this.speed = 0;
    this.acceleration = 0;
    this.curveAngle = 0;
};

MovingCar2.prototype.getAabbMin = function(){
    return this.aabbMin.x;
};

MovingCar2.prototype.resetBoundingBox = function(){
    this.aabbMin = new THREE.Vector3(-32.5, -12.5, -17.5);
    this.aabbMax = new THREE.Vector3(32.5, 12.5, 17.5);
};







