/**
 * Class basicCar
 * vector position for car (keep in mind car's center point is inside the car):
 * @param x
 * @param y
 * @param z
 */

function showCar(x, y, z) {
    var car = new BasicCar(x,y,z);
    car.scale.set(10,10,10);
    scene.add( car );
}

function createBasicCar(x,y,z){
    return new BasicCar(x,y,z);
}

function BasicCar(x,y,z){

    'use strict';
    this.car = new THREE.Object3D();

    var carLength = 13;
    var carBlockHeight = 1;

    var carWidth = 5;
    var roofLength = 3;
    var roofHeight = carBlockHeight + roofLength/2;

    var windowPosition = roofLength/2 + carBlockHeight;
    var wheelPosition = roofLength/2 + carBlockHeight;
    var wheelWidth = carBlockHeight/3;

    var wheelRadius = (carBlockHeight*2)/3;
    var car = this.car;

    material = new THREE.MeshBasicMaterial({ color: 0xff1a8c, wireframe: false });

    addLowerBody(car, x, y, z, carLength, carBlockHeight, carWidth);

    addCarRoof(car, x, y, z, carBlockHeight, carWidth, roofLength, roofHeight, windowPosition);

    addCarWheels(car, x, y, z, carBlockHeight, wheelPosition, wheelRadius, wheelWidth, carWidth);

    return car;
}

BasicCar.protype = Object.create(THREE.Object3D());


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


function addLowerBody(obj, x, y, z, carLength, carBlockHeight, carWidth){

    //lower bottom
    var carGeometry = new THREE.CubeGeometry(carLength, carBlockHeight, carWidth);
    var bottom = new THREE.Mesh(carGeometry, material);
    bottom.position.set(x,y,z);
    obj.add(bottom);


    //lower top
    carGeometry = new THREE.CubeGeometry(carLength - 2*carBlockHeight, carBlockHeight, carWidth);
    var top = new THREE.Mesh(carGeometry, material);
    top. position.set(x, y+carBlockHeight, z);
    obj.add(top);

    //top prism ending positive
    carGeometry = createTriangularPrism(carBlockHeight, carWidth);
    var carFront = new THREE.Mesh(carGeometry, material);
    carFront.position.set(x + ((carLength - carBlockHeight)/2), y + carBlockHeight , z);
    obj.add(carFront);

    //top prism ending negative
    carGeometry = createTriangularPrism(carBlockHeight,carWidth);
    var carBack = new THREE.Mesh(carGeometry, material);
    carBack.rotateY(Math.PI);
    carBack.position.set( x - ((carLength - carBlockHeight)/2) , y + carBlockHeight , z);
    obj.add(carBack);

}



function addCarRoof(obj, x, y, z, carBlockHeight, carWidth, roofLength, roofHeight, windowPosition){

    //roof
    var carGeometry = new THREE.CubeGeometry( roofLength , 2*carBlockHeight, carWidth);
    var roof = new THREE.Mesh(carGeometry, material);
    roof.position.set(x, y + roofHeight, z);
    obj.add(roof);


    var windowMaterial = new THREE.MeshBasicMaterial({ color: 0xcce6ff, wireframe: false });

    //front window
    carGeometry = createTriangularPrism(carBlockHeight*2, carWidth);
    var frontWindow = new THREE.Mesh(carGeometry, windowMaterial);
    frontWindow.position.set(x + windowPosition , y + roofHeight , z);
    obj.add(frontWindow);

    //back window
    carGeometry = createTriangularPrism(carBlockHeight*2,carWidth);
    var backWindow = new THREE.Mesh(carGeometry, windowMaterial);
    backWindow.rotateY(Math.PI);
    backWindow.position.set(x - windowPosition, y + roofHeight , z);
    obj.add(backWindow);
}


function addCarWheels (obj, x, y, z, carBlockHeight, wheelPosition, wheelRadius, wheelWidth, carWidth){

    var wheelMaterial = new THREE.MeshBasicMaterial({ color: 0xb3b3cc, wireframe: false });
    var carGeometry = new THREE.TorusGeometry( wheelRadius , wheelWidth, 16,100);
    var wheel;

    wheel = new THREE.Mesh(carGeometry, wheelMaterial);
    wheel.position.set(x + wheelPosition +carBlockHeight, y - carBlockHeight/2, z + carWidth/2 + wheelWidth);
    obj.add(wheel);

    wheel = new THREE.Mesh(carGeometry, wheelMaterial);
    wheel.position.set(x - wheelPosition - carBlockHeight, y - carBlockHeight/2, z + carWidth/2 + wheelWidth);
    obj.add(wheel);

    wheel = new THREE.Mesh(carGeometry, wheelMaterial);
    wheel.position.set(x - wheelPosition - carBlockHeight, y - carBlockHeight/2, z - carWidth/2 - wheelWidth);
    obj.add(wheel);

    wheel = new THREE.Mesh(carGeometry, wheelMaterial);
    wheel.position.set(x + wheelPosition + carBlockHeight, y - carBlockHeight/2, z - carWidth/2 - wheelWidth);
    obj.add(wheel);
}




