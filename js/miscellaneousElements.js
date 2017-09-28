var material, geometry, mesh;

function createTorus(x, y, z) {		
	geometry = new THREE.TorusGeometry(7,2.7, 16, 100, Math.PI * 2);
	material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff, wireframe: false});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x,y,z);
	mesh.rotation.x = Math.PI/2;
	scene.add(mesh);

	
}

function createTable(x,y,z){
	geometry = new THREE.BoxGeometry(1000, 20, 500);
	material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x,y,z);
	scene.add(mesh);

	return mesh;
}
