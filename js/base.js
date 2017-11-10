var scene;
var gameStatusScene;
var renderer;
var animatables;
var table;
var startingLines;
var inputHandler;
var cameraHandler;
var lightsHandler;
var animationClock;
var gameRunning;
var gameOver;
var requestedRestart;

function render(){
    var height = window.innerHeight;
    var width = window.innerWidth;


    renderer.setViewport(0, 0, width, height/15);
    renderer.setScissor(0, 0, width, height/15);
    renderer.setScissorTest (true);

	renderer.render(gameStatusScene, cameraHandler.getGameStatusCamera());

    renderer.setViewport(0, height/15, width, 14*height/15);
    renderer.setScissor(0 , height/15, width, 14*height/15);
    renderer.setScissorTest (true);

    renderer.render(scene, cameraHandler.selectedCamera());

}

function pauseAnimation(delta){
    cameraHandler.pauseCamera.lookAt(scene.position);
    cameraHandler.pauseCamera.translateX(25 * delta);
}

function gameOverAnimation(delta){
    var randomUp = Math.floor(Math.random() * animatables.length);
    var distance = 100;
    animatables[randomUp].position.y+=(distance*delta);
    animatables[randomUp].rotateZ((Math.PI/30)*Math.random());
    animatables[randomUp].rotateX((Math.PI/30)*Math.random());
}


function renderSplitScreen(){
	var height = window.innerHeight;
	var width = window.innerWidth;
	cameraHandler.updateSelectedCamera(2);

	renderer.setViewport(0, 0, width/2 - 10, height);
	renderer.setScissor(0, 0, width/2 - 10, height);
	renderer.setScissorTest (true);
	cameraHandler.resizePerspectiveCamera(2, (width/2 - 10)/height);
	renderer.render(scene, cameraHandler.selectedCamera());

	cameraHandler.updateSelectedCamera(3);

	renderer.setViewport(width/2 + 10, 0, width/2, height);
	renderer.setScissor(width/2 + 10, 0, width/2, height);
	renderer.setScissorTest (true);
	cameraHandler.resizePerspectiveCamera(3, (width/2 - 10)/height);
    renderer.render(scene, cameraHandler.selectedCamera());
    //render();*/
}

function createScene(){
	scene = new THREE.Scene();
    gameStatusScene = new THREE.Scene();
	//scene.add(new THREE.AxisHelper(10));
    //gameStatusScene.add(new THREE.AxisHelper(1000));
}


function animate(){

	var possibleCollisions = animatables;
    var delta = animationClock.getDelta();
    var tableDimensions = [table.getDimensions()[0], table.getDimensions()[2]];

    if(gameOver){
        pauseAnimation(delta);
        gameOverAnimation(delta);
        if(requestedRestart){
            restartGame();
            return;
        }
    }
    else if(gameRunning){
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
    renderer.setClearColor(0x000000,1);
	document.body.appendChild(renderer.domElement);

	loadTextures();
    createScene();

    restoreLives();

    table = createTable();

    var track = createTrack();
    var butters = addButters();
    var oranges = addOranges();
    inputHandler = new InputHandler();
    lightsHandler = new LightsHandler();
    cameraHandler = new CameraHandler(table.getDimensions());
    startingLines = track.getStartingLines();

    var car = createMovingCar(0,6.5,0);

    cameraHandler.createCameraForObject(car);
    inputHandler.addCarControls(car);
    animationClock = new THREE.Clock();
    animatables = [];
    gameRunning = true;
    gameOver = false;
    requestedRestart = false;


    car.returnToStart();

    scene.add(car);
    scene.add(table);
    scene.add(track);

    animatables.push(car);
    animatables = animatables.concat(track.getCheerios());
    animatables = animatables.concat(butters);
    animatables = animatables.concat(oranges);

    window.addEventListener("resize", onResize);
	window.addEventListener("keydown", inputHandler.onKeyDown);
	window.addEventListener("keyup", inputHandler.onKeyRelease);
	animate();
}
