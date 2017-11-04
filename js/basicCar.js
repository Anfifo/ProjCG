
/**
 * Class basicCar
 *
 * This car "inherits" from THREE.Object3D;
 * It is a 3D object composed by several parts in the shape of a basic car
 *
 * For more information on Object 3D check three.js documentation
 *
 *
 */

'use strict';



/**
 * Class Constructor
 * @param x position in x axis where car will spawn
 * @param y "
 * @param z "
 * @param properties additional properties like color
 * @constructor
 */
function BasicCar(x,y,z, properties){

    /**
     * calls the super constructor
     */
    PhysicObject.call(this);

    this.type = "Car";
    this.x = x;
    this.z = z;
    this.y = y;
    this.lookAt(new THREE.Vector3(0,0,0));

    if (properties !== undefined && properties !== null)
        this.carColor = properties.color;

    if (this.carColor === undefined)
        this.carColor = 0xff1a8c;

    this.carLength = 13;
    this.carBlockHeight = 1;
    this.carWidth = 5;
    this.roofLength = 3;

    this.roofHeight = this.carBlockHeight + this.roofLength/2;
    this.windowPosition = this.roofLength/2 + this.carBlockHeight;
    this.wheelPosition = this.roofLength/2 + this.carBlockHeight;
    this.wheelWidth = this.carBlockHeight/2;
    this.wheelRadius = this.carBlockHeight;

    this.carMaterial = new THREE.MeshLambertMaterial({ color: this.carColor});
    this.wheelMaterial = new THREE.MeshLambertMaterial({ color: 0xb3b3cc});
    this.windowMaterial = new THREE.MeshLambertMaterial({ color: 0xcce6ff});

    this.addLowerBody();
    this.addCarRoof();
    this.addCarWheels();

    this.light = new THREE.SpotLight(0xfdfbd8, 1     , 200, Math.PI+Math.PI/8, 0.7, 2);
    this.light.position.set(this.x + this.carLength/2, this.y, this.z);
    this.light.target.position.set(this.x +this.carLength, this.y, this.z);
    this.add(this.light);
    this.add(this.light.target);
}


//adds to BasicCar class all method and attributes from physical object
BasicCar.prototype = Object.create(PhysicObject.prototype);

//prevents issues with isInstance after inheritance D
BasicCar.prototype.constructor = BasicCar;




/**
 * Adds the car lower body to the 3d object
 */
BasicCar.prototype.addLowerBody = function (){

    //lower bottom
    var bottom = new CuboidMesh(this.carLength, this.carBlockHeight, this.carWidth, this.carMaterial);
    bottom.position.set(this.x,this.y,this.z);
    this.add(bottom);

    //lower top
    var top = new CuboidMesh(this.carLength - 2*this.carBlockHeight, this.carBlockHeight, this.carWidth, this.carMaterial);
    top. position.set(this.x, this.y+this.carBlockHeight, this.z);
    this.add(top);

    //top prism ending positive
    var carFront = new TriangularRectPrismMesh(this.carBlockHeight, this.carBlockHeight, this.carWidth , this.carMaterial);
    carFront.position.set(this.x + ((this.carLength - this.carBlockHeight)/2), this.y + this.carBlockHeight , this.z);
    this.add(carFront);

    //top prism ending negative
    var carBack = new TriangularRectPrismMesh(this.carBlockHeight, this.carBlockHeight, this.carWidth , this.carMaterial);
    carBack.rotateY(Math.PI);
    carBack.position.set( this.x - ((this.carLength - this.carBlockHeight)/2) , this.y + this.carBlockHeight , this.z);
    this.add(carBack);

};


/**
 * adds the car roof to the 3D object
 */
BasicCar.prototype.addCarRoof = function (){

    //roof
    var roof = new CuboidMesh(this.roofLength , 2*this.carBlockHeight, this.carWidth, this.carMaterial);
    roof.position.set(this.x, this.y + this.roofHeight, this.z);
    this.add(roof);

    //front window
    var frontWindow = new TriangularRectPrismMesh(this.carBlockHeight*2,this.carBlockHeight*2, this.carWidth, this.windowMaterial);
    frontWindow.position.set(this.x + this.windowPosition , this.y + this.roofHeight , this.z);
    this.add(frontWindow);

    //back window
    var backWindow = new TriangularRectPrismMesh(this.carBlockHeight*2,this.carBlockHeight*2, this.carWidth, this.windowMaterial);
    backWindow.rotateY(Math.PI);
    backWindow.position.set(this.x - this.windowPosition, this.y + this.roofHeight , this.z);
    this.add(backWindow);
};


/**
 * adds the wheels to the 3d object
 */
BasicCar.prototype.addCarWheels = function(){
    var i;
    var wheel, position;
    var wheelMaterial = this.wheelMaterial;
    var numberOfPrisms = 16;
    var radius = this.wheelRadius;
    var width = this.wheelWidth;
    var wheelX = this.wheelPosition +this.carBlockHeight;
    var wheelY = this.carBlockHeight/2;
    var wheelZ = + this.carWidth/2 + this.wheelWidth/2;

    var wheelPositions = [
        [this.x + wheelX, this.y - wheelY, this.z + wheelZ], // front right wheel
        [this.x - wheelX, this.y - wheelY, this.z + wheelZ], // back rigth wheel
        [this.x - wheelX, this.y - wheelY, this.z - wheelZ], // back left wheel
        [this.x + wheelX, this.y - wheelY, this.z - wheelZ]  // front left wheel
    ];

    for (i = 0; i < 4; i++){
        position = wheelPositions[i];
        console.log(position);
        wheel = new ShapeObject(radius, width, numberOfPrisms, wheelMaterial);
        wheel.position.set(position[0], position[1], position[2]);
        this.add(wheel);
    }

};


