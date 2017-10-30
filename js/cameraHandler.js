 /**
 * Class CameraHandler
 *
 * creates and manages cameras
 */


 /**
 * Class Constructor
 * @param table dimensions
 * @constructor
 */
function CameraHandler( dimensions ){
	this.height = dimensions[2]/2 + 100;
	this.width = dimensions[0]/2 + 100;
	this.window_ratio = window.innerHeight/window.innerWidth;
	this.cameras = [];
	this.OrthographicCamera(0, 70, 0);
	this.createPerspectiveCamera(0, 500, 700);
	this.cameraNr = 0;
	this.splitScreen = false;
}

/**
 * adds an THREE.OrthographicCamera
 * @param x coordinate VRP
 * @param y coordinate VRP
 * @param z coordinate VRP
 */
CameraHandler.prototype.OrthographicCamera = function(x, y, z) {

	
	var table_ratio = this.height/this.width;
	var camera;

	if(this.window_ratio > table_ratio)
		camera = new THREE.OrthographicCamera(-this.width, this.width, this.width*this.window_ratio, -this.width*this.window_ratio, 0.1, 100000);
	else{
		this.window_ratio = 1 / this.window_ratio;
		camera = new THREE.OrthographicCamera(-this.height*this.window_ratio, this.height*this.window_ratio, this.height, -this.height, 0.1, 100000);

	}

	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;

	camera.lookAt(scene.position);
	this.cameras.push(camera);
};

/**
 * adds an THREE.PerspectiveCamera
 * @param x coordinate VRP
 * @param y coordinate VRP
 * @param z coordinate VRP
 */
CameraHandler.prototype.createPerspectiveCamera = function(x,y,z) {


    var camera = new THREE.PerspectiveCamera(60, this.window_ratio, 1, 3000);
    camera.position.set(x, y, z);

    camera.lookAt(scene.position);
    this.cameras.push(camera);
    return camera;
};

/**
 * creates a camera that folows the given object
 * @param object
 */
CameraHandler.prototype.createCameraForObject = function(object){
	object.add(this.createPerspectiveCamera(-50, 35, 0));
	if(this.cameras.length > 3){
		this.resize();
	}
};

/**
 * @returns reference to the currently selected camera
 */
CameraHandler.prototype.selectedCamera = function(){
	return this.cameras[this.cameraNr];
};

/**
 * updates the selected camera
 */
CameraHandler.prototype.updateSelectedCamera = function(cameraNr){
	if(cameraNr < this.cameras.length)
		this.cameraNr = cameraNr;
};

/**
 * updates the cameras properties
 */
CameraHandler.prototype.resize = function(){
	this.window_ratio = renderer.getSize().height/renderer.getSize().width;
    var table_ratio = this.height/this.width;
    console.log(this.window_ratio);

 	for(var i = 1; i < this.cameras.length; i++){
	 	this.cameras[i].aspect = 1 / this.window_ratio;
		this.cameras[i].updateProjectionMatrix();
		console.log(i);

	}


	if(window.innerHeight > 0 && window.innerWidth > 0){
		if(this.window_ratio > table_ratio){
			this.cameras[0].left = -this.width;
			this.cameras[0].right = this.width;
			this.cameras[0].top = this.width * this.window_ratio;
			this.cameras[0].bottom = -this.width * this.window_ratio;
		}

		else{
			this.cameras[0].left = -this.height * (1 / this.window_ratio);
			this.cameras[0].right = this.height * (1 / this.window_ratio);
			this.cameras[0].top = this.height;
			this.cameras[0].bottom = -this.height;
			
		}
	}

	this.cameras[0].updateProjectionMatrix();
};


CameraHandler.prototype.resizePerspectiveCamera = function(cameraNr, aspect_ratio){
	if(cameraNr < this.cameras.length){
		this.cameras[cameraNr].aspect = aspect_ratio;
		this.cameras[cameraNr].updateProjectionMatrix();
	}

};

CameraHandler.prototype.splitScreenOn = function(){
	return this.splitScreen;
};

CameraHandler.prototype.setSplitScreen = function(value){
	this.splitScreen = value;
};

