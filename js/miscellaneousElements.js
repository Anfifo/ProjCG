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
