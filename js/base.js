var scene, renderer;
var animatables = [];
var oranges = [];
var cameraHandler;
var clock, delta;
var speed = 50, maxSpeed = 350;

function render(){
	renderer.render(scene, cameraHandler.selectedCamera());
}


function checkOutOfBounds(object){
    var width = 1000;
    var depth =  500;

    var coordinates = object.getWorldPosition();

    if(coordinates.x > width/2 || coordinates.x <  - width/2 || coordinates.z > depth/2 || coordinates.z < -depth/2){
        if(object.type==="Cheerio")
            object.visible = false;

        if(object.type==="Car"){
            object.returnToStart();
        }
        if(object.type ==="Orange" && object.visible == true){
            object.visible = false;
            var timeout = Math.random() * 10000;
            setTimeout(function(){
                object.hideShow(width/4, depth/4);
			}, timeout);
        }
    }



}

function renderSplitScreen(){
	var height = window.innerHeight;
	var width = window.innerWidth;
	cameraHandler.updateSelectedCamera(2);

	renderer.setViewport(0, 0, width/2 - 10, height);
	renderer.setScissor(0, 0, width/2 - 10, height);
	renderer.setScissorTest (true);
	cameraHandler.resizePerspectiveCamera(2, (width/2 - 10)/height);
	render();

	cameraHandler.updateSelectedCamera(3);

	renderer.setViewport(width/2 + 10, 0, width/2, height);
	renderer.setScissor(width/2 + 10, 0, width/2, height);
	renderer.setScissorTest (true);
	cameraHandler.resizePerspectiveCamera(3, (width/2 - 10)/height);
	render();
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function randomPosition(value) {
	return value - Math.random() * (value-(-value));
}


function animate(){

	var possibleCollisions = animatables;

	animatables.forEach(function(element){
		element.animate(possibleCollisions);
		checkOutOfBounds(element);
	} );

    if(cameraHandler.splitScreenOn())
    	renderSplitScreen();
    else{
    	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissorTest (false);
    	render();
    }
    /*var position = animatables[0].car.position;
    camera.position.set(position.x - 100 , 200 + position.y , position.z);*/

	// delta = clock.getDelta();
	// animateOranges(delta);

    requestAnimationFrame(animate);
}

function onResize(dimensions) {
	renderer.setSize(window.innerWidth, window.innerHeight);

	cameraHandler.resize();
}


function addButters(){
	var butters = [];

    var butter = new Butter(-400, 15, 150);
    scene.add(butter);
	butters.push(butter);

    butter = new Butter(0, 15, -150);
    butter.rotation.y = Math.PI/2;
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(400, 15, -150);
    butter.rotation.y = Math.PI/2;
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(-80, 15, 200);
    butter.rotation.y = -Math.PI/2;
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(-440, 15, -60);
    butter.rotation.y = -Math.PI;
    scene.add(butter);
    butters.push(butter);

    return butters;
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



	//draw_infinity_track(cheerioProperties);
	var track = new InfinityTrack(cheerioProperties);
	scene.add(track);

	oranges[0] = new Orange(80, 33, 200 );

    scene.add(oranges[0]);
	oranges[1] = new Orange(400,33,125);

    scene.add(oranges[1]);
	oranges[2] = new Orange(-370,33, -180);

    scene.add(oranges[2]);

	//Car handling
	var inputHandler = new InputHandler();

    var butters = addButters();


    //Posicao inicial = (-8, 6.5, 70)
	var car = createMovingCar(0,6.5,0);

    car.returnToStart();

    cameraHandler.createCameraForObject(car);

    scene.add(car);

    
	inputHandler.addCarControls(car);

    animatables.push(car);
    animatables = animatables.concat(track.getCheerios());
    animatables = animatables.concat(butters);
    animatables = animatables.concat(oranges);




	var dim = table.getDimensions();
    window.addEventListener("resize", function(dim){
   											return function(){onResize(dim)}
									  }(dim));

	window.addEventListener("keydown", inputHandler.onKeyDown);
	window.addEventListener("keyup", inputHandler.onKeyRelease);

	animate();

}


