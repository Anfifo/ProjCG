'use strict';


function CarF1 (x,y,z, properties){
    // size é um multiplicador do tamanho original (+/- 9.5)

    this._size = 3;

    PhysicObject.call(this, x, y, z, properties);



    var size = this._size;
    var car = new THREE.Object3D();


    this.addCarWheel(car, 2, 0, 2);
    this.addCarWheel(car, 2, 0, -2);
    this.addCarWheel(car, 7.75, 0, 2);
    this.addCarWheel(car, 7.75, 0, -2);
    this.addCarChassi(car, 4, 0, 0);
    this.addCarBack(car, 7.75, 0, 0);
    this.addCarEixoFront(car, 2, 0, 1.5);
    this.addCarEixoFront(car, 2, 0, -1.5);
    this.addCarEixoBack(car, 7.75, 0, 1.75);
    this.addCarEixoBack(car, 7.75, 0, -1.75);

    //triangulo parachoques
    this.addTriangleGeometry(car, 1, 0.5, 4, 0, -0.25, 0, 0, 0, 0); // addTriangleGeometry(obj, comprimento, altura, profundidade, posx, posy, posz, rotx, roty, rotz)

    //triangulo condutor
    this.addTriangleGeometry(car, 4.75, 0.75, 2, 2.25, 0.25, 0, 0, 0, 0);

    //triangulo trazeiro
    this.addTriangleGeometry(car, 1.5, 0.75, 3, 7, 0.25, 0, 0, Math.PI, 0);

    //triangulos laterais
    this.addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, -1.25, -Math.PI/2,0,0);
    this.addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, 1.25, Math.PI/2,0,0);

    this.addCarWingSup(car, 8, 0.75, 1);
    this.addCarWingSup(car, 8, 0.75, -1);
    this.addCarWing(car, 8, 1, 0);

    car.castShadow = true;
    car.position.set(x, y + 0.7 * size, z); // y + 0.7 por causa do raio da roda
    car.scale.set(size, size, size);

    this.add(car);

    this.triangleGeometry = function(comp, alt, width) {

        var triangle = new THREE.Shape();

        triangle.moveTo(0, 0);
        triangle.lineTo(comp, 0);
        triangle.lineTo(comp, alt);

        var extrudeSettings = { //  transforma uma figura 2D em 3D
            steps: 1,
            amount: width,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry(triangle, extrudeSettings);
        geometry.center();
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material) ;

        return mesh;
    };

    this.addTriangleGeometry = function(obj, comp, alt, width, x, y, z, rotx, roty, rotz) {
        var mesh = this.triangleGeometry(comp, alt, width);

        mesh.rotation.set(rotx, roty, rotz);
        mesh.position.set(x + (comp / 2), y + (alt / 2), z);

        obj.add(mesh);
    };

    this.addCarWing = function(obj, x, y, z) {
        var geometry = new THREE.BoxGeometry(1, 0.25, 5);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };

    this.addCarWingSup = function(obj, x, y, z) {
        var geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotateZ(-Math.PI / 6);

        obj.add(mesh);
    };

    this.addCarEixoFront = function(obj, x, y, z) {
        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 10);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotateX(Math.PI / 2);

        obj.add(mesh);
    };

    this.addCarEixoBack = function(obj, x, y, z) {
        var geometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 10);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotateX(Math.PI/2);

        obj.add(mesh);
    };

    this.addCarBack = function(obj, x, y, z) {
        var geometry = new THREE.BoxGeometry(1.5, 0.5, 3);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };

    this.addCarChassi = function(obj, x, y, z) {
        var geometry = new THREE.BoxGeometry(6, 0.5, 2);
        var material = new THREE.MeshStandardMaterial({color: 0xff0ff0, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    };

    this.addCarWheel = function(obj, x, y, z) {
        var geometry = new THREE.TorusGeometry(0.5, 0.2, 10, 75);
        var material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);

        obj.add(mesh);
    }
}


/**
 * adds to Orange class all method and attributes from THRE.Object3D
 */
CarF1.prototype = Object.create(PhysicObject.prototype);

/**
 * prevents issues with isInstance after Orange inheritance from THREE.Object3D
 */
CarF1.prototype.constructor = CarF1;

