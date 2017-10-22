var scene, renderer;
var animatables = [];
var oranges = [];
var cameraHandler;
var clock, delta;
var speed = 50, maxSpeed = 350;

function render(){
	renderer.render(scene, cameraHandler.selectedCamera());
}

function renderSplitScreen(){
	var height = window.innerHeight;
	var width = window.innerWidth;
	cameraHandler.updateSelectedCamera(2);

	renderer.setViewport(0, 0, width/2, height);
	renderer.setScissor(0, 0, width, height);
	renderer.setScissorTest (true);
	cameraHandler.resizePerspectiveCamera(2, (width/2)/height);
	render();

	cameraHandler.updateSelectedCamera(3);

	renderer.setViewport(width/2, 0, width/2, height);
	renderer.setScissor(width/2, 0, width/2, height);
	renderer.setScissorTest (true);
	cameraHandler.resizePerspectiveCamera(3, (width/2)/height);
	render();
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function randomPosition(value) {
	return value - Math.random() * (value-(-value));
}

function hideShowOrange(orange, width, height) {
	orange.visible = false;
	orange.direction.x = randomPosition(1);
	orange.direction.z = randomPosition(1);
	orange.position.x = randomPosition(width / 4);
	orange.position.z = randomPosition(height / 4);
	setTimeout(function(){
		orange.visible = true;
		if (speed < maxSpeed)
			speed += 5;
	}, Math.random() * 10000);
}

function animateOranges(delta) {
	var width = 530;
	var height = 280;

	for (var i = 0; i < oranges.length; i++) {
		var xDistance = speed * delta * oranges[i].direction.x;
		var zDistance = speed * delta * oranges[i].direction.z;


		var xAngle = xDistance / 23;
		var zAngle = zDistance / 23;
		oranges[i].rotateX(zAngle);
		oranges[i].rotateZ(-xAngle);
		oranges[i].position.x += xDistance;
		oranges[i].position.z += zDistance;

		if (-width > oranges[i].position.x || oranges[i].position.x > width || -height > oranges[i].position.z || oranges[i].position.z > height )
			hideShowOrange(oranges[i], width/2, height/2);
	}
}

function animate(){
    animatables.forEach(function(element){ element.animate()} );

    if(cameraHandler.splitScreenOn())
    	renderSplitScreen();
    else{
    	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissorTest (false);
    	render();
    }
    /*var position = animatables[0].car.position;
    camera.position.set(position.x - 100 , 200 + position.y , position.z);*/

	delta = clock.getDelta();
	animateOranges(delta);

    requestAnimationFrame(animate);
}

function onResize(dimensions) {
	renderer.setSize(window.innerWidth, window.innerHeight);

	cameraHandler.resize();
}


function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	clock = new THREE.Clock();

	createScene();


	var properties = {
        width: 1000,
        height: 20,
        depth: 500,
        color: 0x9da4a8,
        wireframe: false,
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    };

    var table = new Table(properties);
	scene.add(table);

	cameraHandler = new CameraHandler(table.getDimensions());



	var cheerioProperties = {
        radius: 7,
		tube: 2.7,
		radialSegments: 5,
		tubularSegments: 10,
		arc: Math.PI * 2,
        color: 0xffffff,
        wireframe: false,
        position: {
            x: 0,
            y: 20,
            z: 0
        },
        rotation: {
        	x: Math.PI/2
        }
    };

    var cheerio = new Cheerio( cheerioProperties );
    scene.add(cheerio);


	//draw_infinity_track(cheerioProperties);
	var track = new InfinityTrack(cheerioProperties);
	scene.add(track);

	oranges[0] = new Orange(80, 23, 200 );
	scene.add(oranges[0]);

	oranges[1] = new Orange(400,23,125);
	scene.add(oranges[1]);

	oranges[2] = new Orange(-370,23, -180);
	scene.add(oranges[2]);

	var butter = new Butter(-400, 15, 150);
	scene.add(butter);

	butter = new Butter(0, 15, -150);
	butter.rotation.y = Math.PI/3;
	scene.add(butter);

	butter = new Butter(400, 15, -150);
	butter.rotation.y = Math.PI/6;
	scene.add(butter);

	butter = new Butter(-80, 15, 200);
	butter.rotation.y = -Math.PI/3;
	scene.add(butter);


	butter = new Butter(-440, 15, -60);
	butter.rotation.y = -Math.PI/12;
	scene.add(butter);




	//Car handling
	var inputHandler = new InputHandler();
	//Posicao inicial = (-8, 6.5, 70)
	//Rotacao inicial = 90


	var car = createMovingCar(0,6.5,0);

    car.scale.set(5,5,5);

    cameraHandler.createCameraForObject(car);
	scene.add(car);


	inputHandler.addCarControls(car);
	animatables.push(car);




	var dim = table.getDimensions();
	window.addEventListener("resize", function(dim){
   											return function(){onResize(dim)}
									  }(dim));

	window.addEventListener("keydown", inputHandler.onKeyDown);
	window.addEventListener("keyup", inputHandler.onKeyRelease);

	animate();

}
