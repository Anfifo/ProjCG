


function createPauseCube(texture){
    var box = new THREE.Object3D();

    
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    var material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture});


    var dimX = 250;
    var dimY = 120;
    var dimZ = 250;
    var light;

    var geometry = new THREE.BoxGeometry(dimX,dimY,dimZ);
    var cuboid = new THREE.Mesh( geometry, material );
    box.add(cuboid);

    var color = 0xffffff, intensity = 1, range = 200, decay = 2;

    light = new THREE.PointLight(color*Math.random(), intensity, range, decay);
    light.position.set(-dimX/2 -5, dimY/2, dimZ/2 + 5);
    box.add(light);

    light = new THREE.PointLight(color*Math.random(), intensity, range, decay);
    light.position.set(dimX/2 + 5 , dimY/2, -dimZ/2 -5);
    box.add(light);

    light = new THREE.PointLight(color*Math.random(), intensity, range, decay);
    light.position.set(-dimX/2 -5 , dimY/2, -dimZ/2 - 5);
    box.add(light);

    light = new THREE.PointLight(color*Math.random(), intensity, range, decay);
    light.position.set(dimX/2 +5, dimY/2, dimZ/2 + 5);
    box.add(light);


    box.position.set(0,120,0);

    return box;
}