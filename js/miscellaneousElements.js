/**
 * Class Table
 *
 * This car "inherits" from THREE.Mesh;
 * It is a Mesh object with a BoxGeometry and a MeshBasicMaterial
 *
 * For more information on Mesh check three.js documentation
 *
 *
 */


 /**
 * Class Constructor
 * @param properties {width, height, depth, color, wireframe, position {x,y,z}}
 * @constructor
 */
function Table(properties){

	this.type = 'Table';
	this.width = properties.width;
	this.height = properties.height;
	this.depth = properties.depth;

	this.color = properties.color;

	this.geometry = new THREE.BoxGeometry(
		properties.width,
		properties.height,
		properties.depth
	);
	/*this.basicMaterial = new THREE.MeshBasicMaterial({
		color: properties.color,
		wireframe: properties.wireframe,
	});*/

	this.lambertMaterial = new THREE.MeshLambertMaterial({
		color: properties.color,
		wireframe: properties.wireframe
	});

	THREE.Mesh.call(
		this,
		this.geometry,
		this.lambertMaterial
	);

	this.position.set(
		properties.position.x,
		properties.position.y,
		properties.position.z
	);

}

/**
 * adds to Table class all method and attributes from THRE.Mesh
 */
Table.prototype = Object.create( THREE.Mesh.prototype );
/**
 * prevents issues with isInstance after Table inheritance from THREE.Mesh
 */
Table.prototype.constructor = Table;

Table.prototype.getDimensions = function() {
	return [this.width,
			this.height,
			this.depth];
};

Table.prototype.toggleToPhong = function(wireframe) {
	this.material = new THREE.MeshPhongMaterial({
		color: this.color,
		wireframe: wireframe,
		reflectivity: 0,
		specular: 0x000000,
		shininess: 0
	});
};


Table.prototype.toggleToGouraud = function(wireframe) {
	this.material = new THREE.MeshLambertMaterial({
		color:this.color,
		wireframe: wireframe,
	});
};



/**
 * Class Cheerio
 *
 * This cheerio "inherits" from THREE.Mesh;
 * It is a Mesh object with a TorusGeometry and a MeshBasicMaterial
 *
 * For more information on Mesh check three.js documentation
 */


 /**
 * Class Constructor
 * @param properties {radius, tube, radialSeguements, tubularSegments, arc, color, wireframe, position {x,y,z}}
 * @constructor
 */
function Cheerio(properties){
	PhysicObject.call(this);

	this.type = 'Cheerio';
	this.mass = 300;
	this.boundingSphereRadius =  properties.radius+ properties.tube+1;
	this.color = properties.color;

	var geometry = new THREE.TorusGeometry(
		properties.radius,
		properties.tube,
		properties.radialSegments,
		properties.tubularSegments,
		properties.arc
	);
	var lambertMaterial = new THREE.MeshLambertMaterial({
		color: properties.color,
		wireframe: properties.wireframe,
	});

	var mesh = new THREE.Mesh( geometry, lambertMaterial);

	mesh.rotation.x = properties.rotation.x;
	this.position.set(
         properties.position.x,
         properties.position.y,
         properties.position.z
	);
	this.add(mesh);

	this.processOutOfBounds = function(){
		this.visible = false;
	 }
 }

/**
 * adds to Cheerio class all method and attributes from THRE.Mesh
 */
Cheerio.prototype = Object.create( PhysicObject.prototype );

/**
 * prevents issues with isInstance after Cheerio inheritance from THREE.Mesh
 */
Cheerio.prototype.constructor = Cheerio;

Cheerio.prototype.toggleToPhong = function(wireframe) {
	this.children[0].material = new THREE.MeshPhongMaterial({
		color: this.color,
		wireframe: wireframe,
		reflectivity: 0,
		specular: 0x000000,
		shininess: 0
	});
};

Cheerio.prototype.toggleToGouraud = function(wireframe) {
	this.children[0].material = new THREE.MeshLambertMaterial({
		color: this.color,
		wireframe: wireframe,
	});
};



/**
 * Class Orange
 *
 * This orange "inherits" from THREE.Object3D;
 * It is an 3D object with a SphereGeometry and a MeshBasicMaterial
 *
 * For more information on Object 3D check three.js documentation
 */


 /**
 * Class Constructor
 * @param x position
 * @param y position
 * @param z position
 * @constructor
 */

function Orange(x, y, z)
{
    'use strict';


	PhysicObject.call(this);
	var self = this;
    this.type = 'Orange';
    this.boundingSphereRadius = 23;
	this.orange = new THREE.Object3D();

	var orangeGeometry = new THREE.SphereGeometry(23, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
	var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xcc6321});
	var orange = new THREE.Mesh(orangeGeometry,lambertMaterial);

	var geometry = new THREE.CylinderGeometry(3, 3, 15, 20, 1, false, 0, 2 * Math.PI);
	var material = new THREE.MeshLambertMaterial({color: 0x463a27});
	var cylinder = new THREE.Mesh(geometry, material);

	cylinder.position.set(0, 20, 0);

	this.orange.add(orange);
	this.orange.add(cylinder);

	this.add(this.orange);

	this.direction = {
        x: Math.random(),
        z: Math.random()
    };

    this.position.set(x, y, z);
//    this.lookAt(animatables[0].position);

    this.rotateY(Math.random()*Math.PI);
	this.speed = 50;
 	this.maxSpeed = 300;

 	function randomPosition(value) {
 		return value - Math.random() * (value + value);
 	}

 	this.calculateTranslation = function (delta) {
		/*
		if(this.speed < this.maxSpeed)
 			this.speed += delta;
		*/
        return  this.speed * delta; //* Math.sign(this.direction.x) ;
 	};

 	this.calculateRotation = function(xDistance) {
 		var xAngle = xDistance / 23;
 		return xAngle;
 	};

 	this.applyTranslation = function(xDistance) {
 		this.translateZ(xDistance);
 	};

 	this.applyRotation = function(radAngle) {
		this.orange.rotation.x += radAngle;

 	};

 	this.hideShow = function(height,width) {
 		this.visible = false;
 		this.direction.x = randomPosition(1);
 		this.direction.z = randomPosition(1);
        this.position.x = randomPosition(width/2);
        this.position.z = randomPosition(height/2);
        //this.lookAt(animatables[0].position);

        this.rotateY(Math.random()*Math.PI);

/*
        if (this.speed < this.maxSpeed) {
            this.speed += 5;
        }
*/
        this.visible = true;

    };

 	this.updateMovement = function(possibleCollisions, delta) {
        var distances = this.calculateTranslation(delta);
        var rotations = this.calculateRotation(distances);
        this.applyRotation(rotations);
        this.applyTranslation(distances);

    };


 	this.processOutOfBounds = function(width, depth) {
        if(this.visible === true){
            this.visible = false;
            var timeout = Math.random() * 5000;
            setTimeout(function () {
                self.hideShow(width / 4, depth / 4);
            }, timeout);
        }
    }
}
/**
 * adds to Orange class all method and attributes from THRE.Object3D
 */
Orange.prototype = Object.create(PhysicObject.prototype);

 /**
  * prevents issues with isInstance after Orange inheritance from THREE.Object3D
  */
Orange.prototype.constructor = Orange;

Orange.prototype.toggleToPhong = function(wireframe) {
	this.orange.children.forEach( function(node){
		if(node instanceof THREE.Mesh)
			node.material = new THREE.MeshPhongMaterial({
				color: node.material.color,
				wireframe: wireframe,
				reflectivity: 0,
				specular: 0x000000,
				shininess: 30
			});
	});
};

Orange.prototype.toggleToGouraud = function(wireframe) {
	this.orange.children.forEach( function(node){
		if(node instanceof THREE.Mesh)
			node.material = new THREE.MeshLambertMaterial({
				color: node.material.color,
				wireframe: wireframe,
			});
	});
};

function Candle(x, y, z)
{
	THREE.Object3D.call(this);

	this.type = 'Candle';

	this.reflectivity = 0;
	this.specular = 0x000000;
	this.shininess = 30;

	var candleGeometry = new THREE.CylinderGeometry(5, 5, 27, 20, 1, false, 0, 2 * Math.PI);
	var candleMaterial = new THREE.MeshLambertMaterial({color: 0xbfb5a0});
	var candle = new THREE.Mesh(candleGeometry, candleMaterial);

	var wickGeometry = new THREE.CylinderGeometry(1, 1, 5, 20, 1, false, 0, 2 * Math.PI);
	var wickMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
	var wick = new THREE.Mesh(wickGeometry, wickMaterial);
	wick.position.set(0, 15, 0);

    this.light = new THREE.PointLight(0xfff9be, 1, 400, 2); // Andre
	//this.light = new THREE.PointLight(0xf6dd9b, 1.5, 350, 2); // Catarina

	this.light.position.set(0, 20, 0);

	this.lightHelper = new THREE.PointLightHelper(this.light, 3);

	this.add(candle);
	this.add(wick);
	this.add(this.light);

	this.position.set(x, y, z);

}

Candle.prototype = Object.create(THREE.Object3D.prototype);

Candle.prototype.constructor = Candle;

Candle.prototype.toggleToPhong = function(wireframe) {
	this.children.forEach( function(node){
		if(node instanceof THREE.Mesh)
			node.material = new THREE.MeshPhongMaterial({
				color: node.material.color,
				wireframe: wireframe,
				reflectivity: 0,
				specular: 0x000000,
				shininess: 30
			});
	});
};

Candle.prototype.toggleToGouraud = function(wireframe) {
	this.children.forEach( function(node){
		if(node instanceof THREE.Mesh)
			node.material = new THREE.MeshLambertMaterial({
				color: node.material.color,
				wireframe: wireframe,
			});
	});
};

/**
 * Class Butter
 *Butterhis Butter "inherits" from THREE.Object3D;
 * It is an 3D object with a BoxGeometry and a MeshBasicMaterial
 *
 * For more information on Object 3D check three.js documentation
 */


 /**
 * Class Constructor
 * @param x position
 * @param y position
 * @param z position
 * @constructor
 */
function Butter(x, y, z)
{
    PhysicObject.call(this);

    'use strict';
    this.boundingSphereRadius = 32;

    this.mass = 100000000;

    this.reflectivity = 0;
	this.specular = 0x000000;
	this.shininess = 0;

    this.type = 'Butter';
    var baseLambertMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var baseGeometry = new THREE.BoxGeometry(42, 0.5, 56);

	var base = new THREE.Mesh(baseGeometry, baseLambertMaterial);

    var butterLambertMaterial = new THREE.MeshLambertMaterial({color: 0xffd830})
    var butterGeometry = new THREE.BoxGeometry(32, 17, 47);

    var butterBar = new THREE.Mesh(butterGeometry, butterLambertMaterial);
    base.position.set(0, -5, 0);

    butterBar.position.set(0, 0, 0);
    this.add(base);
    this.add(butterBar);

    this.position.set(x, y, z);

}


/**
 * adds to Butter class all method and attributes from THRE.Object3D
 */
Butter.prototype = Object.create(PhysicObject.prototype);

/**
 * prevents issues with isInstance after Butter inheritance from THREE.Object3D
 */
Butter.prototype.constructor = Butter;

Butter.prototype.toggleToPhong = function(wireframe) {
	this.children.forEach( function(node){
		if(node instanceof THREE.Mesh)
			node.material = new THREE.MeshPhongMaterial({
				color: node.material.color,
				wireframe: wireframe,
				reflectivity: 0,
				specular: 0x000000,
				shininess: 30
			});
	});
};

Butter.prototype.toggleToGouraud = function(wireframe) {
	this.children.forEach( function(node){
		if(node instanceof THREE.Mesh)
			node.material = new THREE.MeshLambertMaterial({
				color: node.material.color,
				wireframe: wireframe,
			});
	});
};
