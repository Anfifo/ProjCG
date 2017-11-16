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
 * @param properties radius, tube, radialSeguements, tubularSegments, arc, color, wireframe, position {x,y,z}
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
        map: properties.map
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
        shininess: 0,
        map: this.map
    });
};

Cheerio.prototype.toggleToGouraud = function(wireframe) {
    this.children[0].material = new THREE.MeshLambertMaterial({
        color: this.color,
        wireframe: wireframe,
        map: this.map
    });
};
