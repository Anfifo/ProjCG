
function LightsHandler( dimensions ){
	this.ambientLight = new THREE.AmbientLight( 0x404040 , 4);
	scene.add(this.ambientLight);
	this.dayTime = true;
}

LightsHandler.prototype.dayNightTime = function(){
	if(this.dayTime)
		scene.remove(this.ambientLight);

	else
		scene.add(this.ambientLight);

	this.dayTime = !this.dayTime;
}


