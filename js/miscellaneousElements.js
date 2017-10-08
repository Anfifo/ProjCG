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

};

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
}



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
	this.type = 'Cheerio';
	this.geometry = new THREE.TorusGeometry(
		properties.radius,
		properties.tube,
		properties.radialSegments,
		properties.tubularSegments,
		properties.arc
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
	this.rotation.x = properties.rotation.x;
};

/**
 * adds to Cheerio class all method and attributes from THRE.Mesh
 */
Cheerio.prototype = Object.create( THREE.Mesh.prototype );

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


 /**
 * Class Constructor
 * @param properties {radius, widthSegments, heightSegments, phiStart,
 					phiLength, thethaStart, thetaLength, wireframe, position {x,y,z}}
 * @constructor
 */

function Orange(x, y, z)
{
    'use strict';

    this.type = 'Orange';
    this.geometry = new THREE.SphereGeometry(25,						/* radius */
                                            20,                         /* widthSegments */
                                            25,                         /* heightSegments */
                                            0,                          /* phiStart */
                                            2 * Math.PI,                /* phiLength */
                                            0,                          /* thetaStart */
                                            2 * Math.PI);               /* thetaLength */
    this.material = new THREE.MeshBasicMaterial({color: 0xe38416});
    var orange = new THREE.Mesh(this.geometry, this.material);

    THREE.Object3D.call(this);
    this.add(orange);

    this.position.set(x, y, z);


}
/**
 * prevents issues with isInstance after Orange inheritance from THREE.Object3D
 */
Orange.prototype.constructor = Orange;

 /**
 * adds to Orange class all method and attributes from THRE.Object3D
 */
Orange.prototype = Object.create(THREE.Object3D.prototype);



/**
 * Class Butter
 *Butterhis Butter "inherits" from THREE.Object3D;
 * It is an 3D object with a BoxGeometry and a MeshBasicMaterial
 *
 * For more information on Object 3D check three.js documentation
 */


 /**
 * Class Constructor
 * @param properties {butterBar{width, height, depth}, base{width, height, depth}, position{x,y,z}}
 * @constructor
 */
function Butter(x, y, z)
{
    'use strict';

    this.type = 'Butter';

    var baseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var baseGeometry = new THREE.BoxGeometry(42, 0.5, 56);
    var base = new THREE.Mesh(baseGeometry, baseMaterial);

    var butterMaterial = new THREE.MeshBasicMaterial({color: 0xffd830})
    var butterGeometry = new THREE.BoxGeometry(32, 17, 47);
    var butterBar = new THREE.Mesh(butterGeometry, butterMaterial);

    base.position.set(0, -5, 0);
    butterBar.position.set(0, 0, 0);

    THREE.Object3D.call(this);
    this.add(base);
    this.add(butterBar);

    this.position.set(x, y, z);

}


/**
 * prevents issues with isInstance after Butter inheritance from THREE.Object3D
 */
Butter.prototype.constructor = Butter;

/**
 * adds to Butter class all method and attributes from THRE.Object3D
 */
Butter.prototype = Object.create(THREE.Object3D.prototype);
