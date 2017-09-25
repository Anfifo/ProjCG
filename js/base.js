var scene, camera, renderer;
var material, geometry, mesh;


function createTorus(x, y, z) {		
	geometry = new THREE.TorusGeometry(10,3, 16, 100, Math.PI * 2);
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: false});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0,30,0);
	mesh.rotation.x = Math.PI/2;
	scene.add(mesh);
}

function createTable(){
	geometry = new THREE.BoxGeometry(1000, 20, 500);
	material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0,0,0);
	scene.add(mesh);
}

function render(){
	renderer.render(scene, camera);
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function createCamera(){
	camera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 0.1, 100000);
	
	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 0;

	camera.lookAt(scene.position);

	var cameraHelper = new THREE.CameraHelper(camera);
	scene.add(cameraHelper);	
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if(window.innerHeight > 0 && window.innerWidth > 0){
		var width = renderer.getSize().width;
		var height = renderer.getSize().height;
		camera.left = -width/2;
		camera.right = width/2;
		camera.top = height/2;
		camera.bottom = -height/2;
		camera.updateProjectionMatrix();
	}
	render();
}

function onKeyDown(e) {
	switch(e.keyCode){
		case 97: //a
		case 65: //A
			scene.traverse(function (node){
				if (node instanceof THREE.Mesh && node.geometry.type == 'BoxGeometry'){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
	}
	render();
}

function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();

	createCamera();

	createTable();

	createTorus(0,0,0);

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
}