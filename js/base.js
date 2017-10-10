var scene, camera, renderer;
var animatables = [];

function render(){
	renderer.render(scene, camera);
}

function createScene(){
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function animate(){

    animatables.forEach(function(element){ element.animate()} );
    render();
    requestAnimationFrame(animate);
}


function createCamera( dimensions ){

	var width = dimensions[0]/2 + 100;
	var height = dimensions[2]/2 + 100;
	console.log(width);
	var window_ratio = window.innerHeight/window.innerWidth;
	var table_ratio = height/width;

	if(window_ratio > table_ratio)
		camera = new THREE.OrthographicCamera(-width, width, width*window_ratio, -width*window_ratio, 0.1, 100000);
	else{
		window_ratio = 1 / window_ratio;
		camera = new THREE.OrthographicCamera(-height*window_ratio, height*window_ratio, height, -height, 0.1, 100000);
	}

	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 0;

	camera.lookAt(scene.position);

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
    console.log(dimensions[2]);
	console.log(window_ratio);
	console.log(table_ratio);

	if(window.innerHeight > 0 && window.innerWidth > 0){
		if(window_ratio > table_ratio){
			camera.left = -width;
			camera.right = width;
			camera.top = width * window_ratio;
			camera.bottom = -width * window_ratio;
			camera.updateProjectionMatrix();
		}
		else{
			window_ratio = 1 / window_ratio;
			camera.left = -height * window_ratio;
			camera.right = height * window_ratio;;
			camera.top = height;
			camera.bottom = -height;
			camera.updateProjectionMatrix();
		}
	}

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

    var table = new Table( properties );
	scene.add(table);

	createCamera(table.getDimensions());

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

	var orange = new Orange(80, 23, 200 );
	scene.add(orange);

	orange = new Orange(400,23,125);
	scene.add(orange);

	orange = new Orange(-370,23, -180);
	scene.add(orange);

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

    var car = createBasicCar(0,6.5,0);
    car.scale.set(5,5,5);

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

	animate(animatables);

}
