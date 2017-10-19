var scene, cameras, renderer;
var animatables = [];
var oranges = [];
var cameraNr;

function render(){
	renderer.render(scene, cameras[cameraNr]);
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function animate(){

	var width = 470;
	var height = 220;

    animatables.forEach(function(element){ element.animate()} );
    render();
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

function createCamera3( dimensions) {
	
	var window_ratio = window.innerWidth / window.innerHeight;//dimensions[0]/dimensions[2];

	var camera = new THREE.PerspectiveCamera(45, window_ratio, 1, 3000);
    camera.position.set(-40 , 40, 0);

    camera.lookAt(scene.position);
    return camera;

    
}

function createCamera2( dimensions) {
    
    var window_ratio =  window.innerWidth / window.innerHeight ; // dimensions[0]/dimensions[2];

    var camera = new THREE.PerspectiveCamera(45, window_ratio, 1, 3000);
    camera.position.set(0 , 500, 700);

    camera.lookAt(scene.position);
    return camera;

}

function createCamera1( dimensions ){

	var width = dimensions[0]/2 + 100;
	var height = dimensions[2]/2 + 100;
	console.log(width);
	console.log(height);
	var window_ratio = window.innerHeight/window.innerWidth;
	var table_ratio = height/width;

	if(window_ratio > table_ratio)
		var camera = new THREE.OrthographicCamera(-width, width, width*window_ratio, -width*window_ratio, 0.1, 100000);
	else{
		window_ratio = 1 / window_ratio;
		var camera = new THREE.OrthographicCamera(-height*window_ratio, height*window_ratio, height, -height, 0.1, 100000);

	}

	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 0;

	camera.lookAt(scene.position);
	return camera;

	/*var cameraHelper = new THREE.CameraHelper(camera);
	scene.add(cameraHelper);*/
}

function onResize(dimensions) {
	renderer.setSize(window.innerWidth, window.innerHeight);

	var window_ratio = renderer.getSize().height/renderer.getSize().width;
	var width = dimensions[0]/2 + 100;
    var height = dimensions[2]/2 + 100;
    var table_ratio = height/width;

    console.log(width);
    console.log(height);

 	for(var i = 1; i < 3; i++){
	 	cameras[i].aspect = 1 / window_ratio;
		cameras[i].updateProjectionMatrix();
	}


	if(window.innerHeight > 0 && window.innerWidth > 0){
		if(window_ratio > table_ratio){
			cameras[0].left = -width;
			cameras[0].right = width;
			cameras[0].top = width * window_ratio;
			cameras[0].bottom = -width * window_ratio;
		}

		else{
			window_ratio = 1 / window_ratio;
			cameras[0].left = -height * window_ratio;
			cameras[0].right = height * window_ratio;;
			cameras[0].top = height;
			cameras[0].bottom = -height;
			
		}
	}

	cameras[0].updateProjectionMatrix();




	/*
	else{

		cameras[0].aspect = window.innerWidth / window.innerHeight
	}*/

	
	// render();
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




	cameras = [createCamera1(table.getDimensions()),
			   createCamera2(table.getDimensions()),
			   createCamera3(table.getDimensions())];
	cameraNr = 0;


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
    var car = createBasicCar(0,6.5,0);
    
    car.scale.set(5,5,5);

    car.add(cameras[2]);

	scene.add(car);


	var carControls = new CarControls(car);

	inputHandler.addCarControls(carControls);
	animatables.push(carControls);


	



	// render();

	var dim = table.getDimensions();
	window.addEventListener("resize", function(dim){
   											return function(){onResize(dim)}
									  }(dim));

	window.addEventListener("keydown", inputHandler.onKeyDown);
	window.addEventListener("keyup", inputHandler.onKeyRelease);

	animate();

}
