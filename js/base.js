var scene, renderer;
var animatables = [];
var tableDimensions = [1000,500];
var table;
var oranges = [];
var startingLines = [];
var cameraHandler;
var lightsHandler;
var animationClock = new THREE.Clock();
var gameRunning = true;

function render(){
	renderer.render(scene, cameraHandler.selectedCamera());
}

function pauseAnimation(delta){
    cameraHandler.pauseCamera.lookAt(scene.position);
    cameraHandler.pauseCamera.translateX(25 * delta);
}



setInterval(function() {
	for (var i = 0; i < oranges.length; i++) {
		if (oranges[i].speed + 20 < oranges[i].maxSpeed)
			oranges[i].speed += 20;
		else
			oranges[i].speed += oranges[i].maxSpeed - oranges[i].speed;
	}
}, 10000);

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


function animate(){

	var possibleCollisions = animatables;
    var delta = animationClock.getDelta();

    if(gameRunning){
        animatables.forEach(function(element){
            element.animate(possibleCollisions, delta);
            element.checkOutOfBounds(tableDimensions[0], tableDimensions[1]);
        } );

        if(cameraHandler.splitScreenOn())
            renderSplitScreen();
        else{
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.setScissorTest (false);
            render();
        }

    }else{
        pauseAnimation(delta);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissorTest (false);

        render();
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

	clock = new THREE.Clock();

	createScene();
    lightsHandler = new LightsHandler();
    var texture = new THREE.TextureLoader().load( 'Textures/prettyDark.jpg' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(1,1);


    var properties = {
        width: 1000,
        height: 20,
        depth: 500,
        //color: 0x9da4a8,
        color:0xdddddd,
        wireframe: false,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        map:texture
    };

    table = new Table(properties);
	scene.add(table);
    
	cameraHandler = new CameraHandler(table.getDimensions());


    
	var cheerioProperties = {
        radius: 7,
		tube: 2.7,
		radialSegments: 5,
		tubularSegments: 20,
		arc: Math.PI * 2,
        color: 0xffffff,
        wireframe: false,
        position: {
            x: 0,
            y: 13,
            z: 0
        },
        rotation: {
        	x: Math.PI/2
        }
    };



	var track = new InfinityTrack(cheerioProperties);
	scene.add(track);
  
	//Car handling
	var inputHandler = new InputHandler();

    var butters = addButters();
    startingLines = track.getStartingLines();
    


    //Posicao inicial = (-8, 6.5, 70)
	var car = createMovingCar(0,6.5,0);
    car.returnToStart();
    cameraHandler.createCameraForObject(car);
    scene.add(car);

	inputHandler.addCarControls(car);
    oranges = addOranges();

    animatables.push(car);
    animatables = animatables.concat(track.getCheerios());
    animatables = animatables.concat(butters);
    animatables = animatables.concat(oranges);


 
	var dim = table.getDimensions();
    window.addEventListener("resize", function(dim){onResize(dim)});

	window.addEventListener("keydown", inputHandler.onKeyDown);
	window.addEventListener("keyup", inputHandler.onKeyRelease);
	animate();

}
