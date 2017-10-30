
function LightsHandler( dimensions ){
	this.ambientLight = new THREE.AmbientLight( 0x404040 , 4);
	scene.add(this.ambientLight);
	this.dayTime = true;
	this.candlesIgnited = true;
}

LightsHandler.prototype.dayNightTime = function(){
	if(this.dayTime)
		scene.remove(this.ambientLight);

	else
		scene.add(this.ambientLight);

	this.dayTime = !this.dayTime;
};

LightsHandler.prototype.switchCandles = function(){
	if(this.candlesIgnited){
		for(candle in this.candles)
			scene.remove(candle);
	}

	else
		for(candle in this.candles)
			scene.add(candle);

	this.candlesIgnited = !this.candlesIgnited;
};