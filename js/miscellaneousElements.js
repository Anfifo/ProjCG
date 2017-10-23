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

	this.geometry = new THREE.BoxGeometry(
		properties.width,
		properties.height,
		properties.depth
	);

	this.material = new THREE.MeshBasicMaterial({
		color: properties.color,
		wireframe: properties.wireframe
	});

	THREE.Mesh.call(
		this,
		this.geometry,
		this.material
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
	this.boundingSphereRadius =  properties.radius+ properties.tube;
	this.aabbMin = new THREE.Vector3(-properties.radius, -properties.tube/2, properties.radius);

	this.aabbMax = new THREE.Vector3(properties.radius, properties.tube/2, -properties.radius);


	var geometry = new THREE.TorusGeometry(
		properties.radius,
		properties.tube,
		properties.radialSegments,
		properties.tubularSegments,
		properties.arc
	);
	var material = new THREE.MeshBasicMaterial({
		color: properties.color,
		wireframe: properties.wireframe
	});

	var mesh = new THREE.Mesh( geometry, material);

	mesh.rotation.x = properties.rotation.x;
	this.position.set(
         properties.position.x,
         properties.position.y,
         properties.position.z
	);
	this.add(mesh);
 }

/**
 * adds to Cheerio class all method and attributes from THRE.Mesh
 */
Cheerio.prototype = Object.create( PhysicObject.prototype );

/**
 * prevents issues with isInstance after Cheerio inheritance from THREE.Mesh
 */
Cheerio.prototype.constructor = Cheerio;



/**
 * Class Orange
 *
 * This orange "inherits" from THREE.Object3D;
 * It is an 3D object with a SphereGeometry and a MeshBasicMaterial
 *
 * For more information on Object 3D check three.js documentation
 */
















//
// function hideShowOrange(orange, width, height) {
//     orange.visible = false;
//     orange.direction.x = randomPosition(1);
//     orange.direction.z = randomPosition(1);
//     orange.position.x = randomPosition(width / 4);
//     orange.position.z = randomPosition(height / 4);
//     setTimeout(function(){
//         orange.visible = true;
//         if (speed < maxSpeed)
//             speed += 5;
//     }, Math.random() * 10000);
// }
//
// function animateOranges(delta) {
//     var width = 530;
//     var height = 280;
//
//     for (var i = 0; i < oranges.length; i++) {
//         var xDistance = speed * delta * oranges[i].direction.x;
//         var zDistance = speed * delta * oranges[i].direction.z;
//
//
//         var xAngle = xDistance / 23;
//         var zAngle = zDistance / 23;
//         oranges[i].rotateX(zAngle);
//         oranges[i].rotateZ(-xAngle);
//         oranges[i].position.x += xDistance;
//         oranges[i].position.z += zDistance;
//
//         if (-width > oranges[i].position.x || oranges[i].position.x > width || -height > oranges[i].position.z || oranges[i].position.z > height )
//             hideShowOrange(oranges[i], width/2, height/2);
//     }
// }


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
	var orangeMaterial = new THREE.MeshBasicMaterial({color: 0xcc6321});
	var orange = new THREE.Mesh(orangeGeometry, orangeMaterial);

	var geometry = new THREE.CylinderGeometry(3, 3, 15, 20, 1, false, 0, 2 * Math.PI);
	var material = new THREE.MeshBasicMaterial({color: 0x463a27});
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
	this.rotateY(Math.random()*Math.PI);
	this.speed = 100;
 	this.maxSpeed = 350;
 	var width = 530;
 	var height = 280;

 	function randomPosition(value) {
 		return value - Math.random() * (value + value);
 	}

 	this.calculateTranslation = function () {
 		var delta = this.updateClock.getDelta();
 		var xDistance = this.speed * delta * this.direction.x;

        return xDistance;
 	};

 	this.calculateRotation = function(xDistance) {
 		var xAngle = xDistance / 23;
 		return xAngle;
 	};

 	this.applyTranslation = function(xDistance) {
 		this.translateX(xDistance);
 	};

 	this.applyRotation = function(xDistance) {
 		// if(rotations.z < 0)
 		// 	rotations.z = -rotations.z;

		this.orange.rotation.z -= xDistance;

 	};

 	this.hideShow = function(height,width) {
 		this.visible = false;
 		this.direction.x = randomPosition(1);
 		this.direction.z = randomPosition(1);
        self.position.x = randomPosition(width/4);
        self.position.z = randomPosition(height/4);
        self.visible = true;
        if (self.speed < self.maxSpeed) {
            self.speed += 5;
        }

    };

 	this.updateMovement = function() {
        var distances = this.calculateTranslation();
        var rotations = this.calculateRotation(distances);
        this.applyRotation(rotations);
        this.applyTranslation(distances);

    };

}
/**
 * adds to Orange class all method and attributes from THRE.Object3D
 */
Orange.prototype = Object.create(PhysicObject.prototype);

 /**
  * prevents issues with isInstance after Orange inheritance from THREE.Object3D
  */
 Orange.prototype.constructor = Orange;


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

    this.type = 'Butter';
    var baseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var baseGeometry = new THREE.BoxGeometry(42, 0.5, 56);

    var base = new THREE.Mesh(baseGeometry, baseMaterial);
    var butterMaterial = new THREE.MeshBasicMaterial({color: 0xffd830})
    var butterGeometry = new THREE.BoxGeometry(32, 17, 47);

    var butterBar = new THREE.Mesh(butterGeometry, butterMaterial);
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
