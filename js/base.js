var scene, camera, renderer;
var table, car;


function render(){
	renderer.render(scene, camera);
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function animate(){

    updateCarMovement();
    render();
    requestAnimationFrame(animate);
}

function createCamera(){

	var width = window.innerWidth;
	var height = window.innerHeight;
	var aspect_ratio = height/width;


	camera = new THREE.OrthographicCamera(-600, 600, 600*aspect_ratio, -600*aspect_ratio, 0.1, 100000);
	//camera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 0.1, 100000);

	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 0;

	camera.lookAt(scene.position);

	var cameraHelper = new THREE.CameraHelper(camera);
	scene.add(cameraHelper);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	var aspect_ratio = window.innerHeight/window.innerWidth;

	if(window.innerHeight > 0 && window.innerWidth > 0){
		var width = renderer.getSize().width;
		var height = renderer.getSize().height;
		camera.left = -600;
		camera.right = 600;
		camera.top = 600 * aspect_ratio;
		camera.bottom = -600 * aspect_ratio;
		camera.updateProjectionMatrix();
	}
	render();
}


function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();

	createCamera();

	table = createTable(0,0,0);

	car = createBasicCar(0,6.5,0);
	car.scale.set(5,5,5);
	scene.add(car);
	carControls = new CarControls(car);

	placeCheerios();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyRelease);

	animate();
}
