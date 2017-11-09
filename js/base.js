var scene, renderer;
var animatables;
var tableDimensions;
var table;
var startingLines;
var cameraHandler;
var lightsHandler;
var animationClock;
var gameRunning;

function render(){
	renderer.render(scene, cameraHandler.selectedCamera());
}

function pauseAnimation(delta){
    cameraHandler.pauseCamera.lookAt(scene.position);
    cameraHandler.pauseCamera.translateX(25 * delta);
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
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}


function animate(){

	var possibleCollisions = animatables;
    var delta = animationClock.getDelta();
    var tableDimensions = [table.getDimensions()[0], table.getDimensions()[2]];

    if(gameRunning){
        animatables.forEach(function(element){
            element.animate(possibleCollisions, delta);
            element.checkOutOfBounds(tableDimensions[0], tableDimensions[1]);
        } );

        if(cameraHandler.splitScreenOn())
            renderSplitScreen();

    }else{
        pauseAnimation(delta);
    }
    render();
    requestAnimationFrame(animate);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	cameraHandler.resize();
}



function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

    createScene();

    table = createTable();

    var track = createTrack();
    var butters = addButters();
    var oranges = addOranges();
    var inputHandler = new InputHandler();
    lightsHandler = new LightsHandler();
    cameraHandler = new CameraHandler(table.getDimensions());
    startingLines = track.getStartingLines();

    var car = createMovingCar(0,6.5,0);

    cameraHandler.createCameraForObject(car);
    inputHandler.addCarControls(car);
    animationClock = new THREE.Clock();
    animatables = [];
    gameRunning = true;


    car.returnToStart();

    scene.add(car);
    scene.add(table);
    scene.add(track);

    animatables.push(car);
    animatables = animatables.concat(track.getCheerios());
    animatables = animatables.concat(butters);
    animatables = animatables.concat(oranges);

    window.addEventListener("resize", function(dim){onResize(dim)});
	window.addEventListener("keydown", inputHandler.onKeyDown);
	window.addEventListener("keyup", inputHandler.onKeyRelease);
	animate();
}
