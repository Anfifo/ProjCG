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

    this.map = butterTexture;

    this.type = 'Butter';
    var baseLambertMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var baseGeometry = new THREE.BoxGeometry(42, 1, 56);

    var base = new THREE.Mesh(baseGeometry, baseLambertMaterial);

    var butterLambertMaterial = new THREE.MeshLambertMaterial({color: 0xffd830, map: this.map})
    var butterGeometry = new THREE.BoxGeometry(32, 15, 47);

    var butterBar = new THREE.Mesh(butterGeometry, butterLambertMaterial);
    base.position.set(0, -5, 0);

    butterBar.position.set(0, 3, 0);
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
                shininess: 30,
                map: node.material.map
            });
    });
};

Butter.prototype.toggleToGouraud = function(wireframe) {
    this.children.forEach( function(node){
        if(node instanceof THREE.Mesh)
            node.material = new THREE.MeshLambertMaterial({
                color: node.material.color,
                wireframe: wireframe,
                map: node.material.map
            });
    });
};


