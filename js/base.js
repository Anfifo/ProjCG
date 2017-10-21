var scene, renderer;
var animatables = [];
var oranges = [];
var cameraHandler;

function render(){
	renderer.render(scene, cameraHandler.selectedCamera());
}

function renderSplitScreen(){
	var height = window.innerHeight;
	var width = window.innerWidth;
	cameraHandler.updateSelectedCamera(2);

	renderer.setViewport(0, 0, width/2, height);
	renderer.setScissor(0, 0, width, height);
	renderer.enableScissorTest (true);
	cameraHandler.resizePerspectiveCamera(2, (width/2)/height);
	render();

	cameraHandler.updateSelectedCamera(3);

	renderer.setViewport(width/2, 0, width/2, height);
	renderer.setScissor(width/2, 0, width/2, height);
	renderer.enableScissorTest (true);
	cameraHandler.resizePerspectiveCamera(3, (width/2)/height);
	render();
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function animate(){

	var width = 470;
	var height = 220;

    animatables.forEach(function(element){ element.animate()} );
    if(cameraHandler.splitScreenOn())
    	renderSplitScreen();
    else{
    	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.enableScissorTest (false);
    	render();
    }
    /*var position = animatables[0].car.position;
    camera.position.set(position.x - 100 , 200 + position.y , position.z);*/


	for (var i = 0; i < oranges.length; i++) {
		oranges[i].position.x += 5 * oranges[i].direction.x;
        oranges[i].position.z += 5 * oranges[i].direction.z;

        // if edge is reached, bounce back
        if (oranges[i].position.x < -width ||
        oranges[i].position.x > width) {
            oranges[i].direction.x = -oranges[i].direction.x;
        }
        if (oranges[i].position.z < -height ||
        oranges[i].position.z > height) {
            oranges[i].direction.z = -oranges[i].direction.z;
        }
	}

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
