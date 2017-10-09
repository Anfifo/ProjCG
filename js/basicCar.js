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
 * Encapsulates the class creation of the BasiCar
 * @param x axis position
 * @param y axis position
 * @param z axis position
 * @param properties additional properties like color
 * @returns {BasicCar}
 */
function createBasicCar(x,y,z, properties){
	return new BasicCar(x,y,z, properties);
}


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
	THREE.Object3D.call(this);

	this.x = x;
	this.z = z;
	this.y = y;

	if (properties !== undefined && properties !== null){
		this.carColor = properties.color;
	}

	if (this.carColor === undefined){
		this.carColor = 0xff1a8c;
	}

	/**
	 * car base properties
	 * @type {number}
	 */
	this.carLength = 13;
	this.carBlockHeight = 1;
	this.carWidth = 5;
	this.roofLength = 3;

    /**
     * additional calculated car building parameters
     * @type {number}
     */
	this.roofHeight = this.carBlockHeight + this.roofLength/2;
	this.windowPosition = this.roofLength/2 + this.carBlockHeight;
	this.wheelPosition = this.roofLength/2 + this.carBlockHeight;
	this.wheelWidth = this.carBlockHeight/3;
	this.wheelRadius = (this.carBlockHeight*2)/3;

	this.material = new THREE.MeshBasicMaterial({ color: this.carColor, wireframe: false });


	this.addLowerBody();
	this.addCarRoof();
	this.addCarWheels();

}

/**
 * adds to BasicCar class all method and attributes
 */
BasicCar.prototype = Object.create(THREE.Object3D.prototype);

/**
 * prevents issues with isInstance after BasiCar inheritance from THREE.Object3D
 */
BasicCar.prototype.constructor = BasicCar;




/**
 * Adds the car lower body to the 3d object
 */
BasicCar.prototype.addLowerBody = function (){

	//lower bottom
	var carGeometry = new THREE.CubeGeometry(this.carLength, this.carBlockHeight, this.carWidth);
	var bottom = new THREE.Mesh(carGeometry, this.material);
	bottom.position.set(this.x,this.y,this.z);
	this.add(bottom);

	//lower top
	carGeometry = new THREE.CubeGeometry(this.carLength - 2*this.carBlockHeight, this.carBlockHeight, this.carWidth);
	var top = new THREE.Mesh(carGeometry, this.material);
	top. position.set(this.x, this.y+this.carBlockHeight, this.z);
	this.add(top);

	//top prism ending positive
	carGeometry = createTriangularPrism(this.carBlockHeight, this.carWidth);
	var carFront = new THREE.Mesh(carGeometry, this.material);
	carFront.position.set(this.x + ((this.carLength - this.carBlockHeight)/2), this.y + this.carBlockHeight , this.z);
	this.add(carFront);

	//top prism ending negative
	carGeometry = createTriangularPrism(this.carBlockHeight,this.carWidth);
	var carBack = new THREE.Mesh(carGeometry, this.material);
	carBack.rotateY(Math.PI);
	carBack.position.set( this.x - ((this.carLength - this.carBlockHeight)/2) , this.y + this.carBlockHeight , this.z);
	this.add(carBack);

}


/**
 * adds the car roof to the 3D object
 */
BasicCar.prototype.addCarRoof = function (){

	//roof
	var carGeometry = new THREE.CubeGeometry( this.roofLength , 2*this.carBlockHeight, this.carWidth);
	var roof = new THREE.Mesh(carGeometry, this.material);
	roof.position.set(this.x, this.y + this.roofHeight, this.z);
	this.add(roof);


	var windowMaterial = new THREE.MeshBasicMaterial({ color: 0xcce6ff, wireframe: false });

	//front window
	carGeometry = createTriangularPrism(this.carBlockHeight*2, this.carWidth);
	var frontWindow = new THREE.Mesh(carGeometry, windowMaterial);
	frontWindow.position.set(this.x + this.windowPosition , this.y + this.roofHeight , this.z);
	this.add(frontWindow);

	//back window
	carGeometry = createTriangularPrism(this.carBlockHeight*2,this.carWidth);
	var backWindow = new THREE.Mesh(carGeometry, windowMaterial);
	backWindow.rotateY(Math.PI);
	backWindow.position.set(this.x - this.windowPosition, this.y + this.roofHeight , this.z);
	this.add(backWindow);
}


/**
 * adds the wheels to the 3d object
 */
BasicCar.prototype.addCarWheels = function(){

	var wheelMaterial = new THREE.MeshBasicMaterial({ color: 0xb3b3cc, wireframe: false });
	var carGeometry = new THREE.TorusGeometry( this.wheelRadius , this.wheelWidth, 5,10);
	var wheel;

	wheel = new THREE.Mesh(carGeometry, wheelMaterial);
	wheel.position.set(this.x + this.wheelPosition +this.carBlockHeight, this.y - this.carBlockHeight/2, this.z + this.carWidth/2 + this.wheelWidth);
	this.add(wheel);

	wheel = new THREE.Mesh(carGeometry, wheelMaterial);
	wheel.position.set(this.x - this.wheelPosition - this.carBlockHeight, this.y - this.carBlockHeight/2, this.z + this.carWidth/2 + this.wheelWidth);
	this.add(wheel);

	wheel = new THREE.Mesh(carGeometry, wheelMaterial);
	wheel.position.set(this.x - this.wheelPosition - this.carBlockHeight, this.y - this.carBlockHeight/2, this.z - this.carWidth/2 - this.wheelWidth);
	this.add(wheel);

	wheel = new THREE.Mesh(carGeometry, wheelMaterial);
	wheel.position.set(this.x + this.wheelPosition + this.carBlockHeight, this.y - this.carBlockHeight/2, this.z - this.carWidth/2 - this.wheelWidth);
	this.add(wheel);
}







function createTriangularPrism(side, length){

	var triangle = new THREE.Shape();
	triangle.moveTo(0,0);
	triangle.lineTo(0,side);
	triangle.lineTo(side,0);

	var extrudeSettings = {
		steps: 2,
		amount: length,
		bevelEnabled: false
	};

	var prism = new THREE.ExtrudeGeometry(triangle, extrudeSettings);

	prism.translate(-(side/2),-(side/2),-length/2);
	return prism;

}
