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
 * @param properties width, height, depth, color, wireframe, position {x,y,z}
 * @constructor
 */
function Table(properties){

    this.type = 'Table';
    this.width = properties.width;
    this.height = properties.height;
    this.depth = properties.depth;
    this.map = properties.map;
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
    if(this.map !== undefined){
        this.lambertMaterial.map = this.map;
        //this.material.needsUpdate = true;
    }

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
    if(this.map !== undefined){
        this.material.map = this.map;
        this.material.needsUpdate = true;
    }
};


Table.prototype.toggleToGouraud = function(wireframe) {
    this.material = new THREE.MeshLambertMaterial({
        color:this.color,
        wireframe: wireframe
    });
    if(this.map !== undefined){
        this.material.map = this.map;
        this.material.needsUpdate = true;
    }
};

