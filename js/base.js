var scene, camera, renderer;
var car;


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

function createCamera( dimensions ){

	var width = dimensions[0]/2 + 100;
	console.log(width);
	var aspect_ratio = window.innerHeight/window.innerWidth;


	camera = new THREE.OrthographicCamera(-width, width, width*aspect_ratio, -width*aspect_ratio, 0.1, 100000);
	//camera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 0.1, 100000);

	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 0;

	camera.lookAt(scene.position);

	var cameraHelper = new THREE.CameraHelper(camera);
	scene.add(cameraHelper);
}

function onResize(dimensions) {
	renderer.setSize(window.innerWidth, window.innerHeight);

	var aspect_ratio = renderer.getSize().height/renderer.getSize().width;
	var width = dimensions[0]/2 + 100;
	console.log(width);

	if(window.innerHeight > 0 && window.innerWidth > 0){
		camera.left = -width;
		camera.right = width;
		camera.top = width * aspect_ratio;
		camera.bottom = -width * aspect_ratio;
		camera.updateProjectionMatrix();
	}
	render();
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
		radialSegments: 16,
		tubularSegments: 100,
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
	

	/////////////////// OUTTER LOOP //////////////////
	draw_half_loop(200,0,200,200,13,cheerioProperties);
	draw_half_loop(-200,0,-200,-200,13,cheerioProperties);
	
	//STRAIGHT PART 
	draw_line(-200, 0, -0.5, 100, cheerioProperties);
	draw_line(-200, 0, 0.5, -100, cheerioProperties);
	draw_line(0, 200, -0.5, -100, cheerioProperties);
	draw_line(0, 200, 0.5, 100, cheerioProperties);
	
	/////////////////// INNER LOOP ///////////////////
	draw_half_loop(200,0,200,100,25,cheerioProperties);
	draw_half_loop(-200,0,-200,-100,25,cheerioProperties);

	//STRAIGHT PART
	draw_line(-200, 200, 0.5, 0, cheerioProperties);
	draw_line(-200, 200, -0.5, 0, cheerioProperties);


	/*var track = new InfinityTrack( cheerioProperties );
	scene.add(track);*/
	

	/*

	car = createBasicCar(0,6.5,0);
	car.scale.set(5,5,5);
	scene.add(car);
	carControls = new CarControls(car);

	*/

	render();

	var dim = table.getDimensions();
	window.addEventListener("resize", function(dim){
   											return function(){onResize(dim)}
									  }(dim));

	/*window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyRelease);

	animate();*/
	
}
