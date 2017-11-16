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
function Orange(x, y, z, textureMap)
{
    'use strict';


    PhysicObject.call(this);
    var self = this;
    this.type = 'Orange';
    this.boundingSphereRadius = 23;
    this.orange = new THREE.Object3D();
    this.map = textureMap;

    var orangeGeometry = new THREE.SphereGeometry(23, 15, 20, 0, 2 * Math.PI, 0, 2 * Math.PI);
    var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xcc6321,  map:this.map});
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
        return xDistance / 23;
    };

    this.applyTranslation = function(xDistance) {
        this.translateZ(xDistance);
    };

    this.applyRotation = function(radAngle) {
        this.orange.rotation.x += radAngle;

    };

    this.hideShow = function(height,width) {
        this.visible = false;
        //
        // this.direction.x = randomPosition(1);
        // this.direction.z = randomPosition(1);
        //
        if(!gameRunning){
            var timeout = Math.random() * 5000;
            setTimeout(function () {
                self.hideShow(width / 4, height / 4);
            }, timeout);
            return;
        }


        this.position.x = randomPosition(width/2);
        this.position.z = randomPosition(height/2);

        this.rotateY(Math.random()*Math.PI);

        this.visible = true;

    };

    this.updateMovement = function(possibleCollisions, delta) {
        var distances = this.calculateTranslation(delta);
        var rotations = this.calculateRotation(distances);
        this.applyRotation(rotations);
        this.applyTranslation(distances);

    };


    this.processOutOfBounds = function(width, height) {
        if(this.visible === true){
            this.visible = false;
            var timeout = Math.random() * 5000;
            setTimeout(function () {
                    self.hideShow(width / 4, height / 4);
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
                shininess: 30,
                map: node.material.map
            });
    });
};

Orange.prototype.toggleToGouraud = function(wireframe) {
    this.orange.children.forEach( function(node){
        if(node instanceof THREE.Mesh)
            node.material = new THREE.MeshLambertMaterial({
                color: node.material.color,
                wireframe: wireframe,
                map: node.material.map
            });
    });
};


