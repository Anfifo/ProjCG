
function LightsHandler( dimensions ){
	this.ambientLight = new THREE.AmbientLight( 0x404040 , 4);
	scene.add(this.ambientLight);
	this.dayTime = true;
	this.candles = [];
	this.candlesIgnited = true;
	this.createCandles();
}
LightsHandler.prototype.createCandles = function () {
	var candle1 = new Candle(-335, 30, 170);
	this.candles.push(candle1);
	scene.add(candle1);

	var candle2 = new Candle(335, 30, 175);
	this.candles.push(candle2);
	scene.add(candle2);

	var candle3 = new Candle(-260, 30, -40);
	this.candles.push(candle3);
	scene.add(candle3);

	var candle4 = new Candle(0, 30, 150);
	this.candles.push(candle4);
	scene.add(candle4);

	var candle5 = new Candle(-70, 30, -150);
	this.candles.push(candle5);
	scene.add(candle5);

	var candle6 = new Candle(220, 30, -70);
	this.candles.push(candle6);
	scene.add(candle6);

}

LightsHandler.prototype.dayNightTime = function(){
	if(this.dayTime)
		scene.remove(this.ambientLight);

	else
		scene.add(this.ambientLight);

	this.dayTime = !this.dayTime;
};

LightsHandler.prototype.switchCandles = function(){
	if (this.candlesIgnited) {
		for (candle of this.candles) {
			candle.light.intensity = 0;
			this.candlesIgnited = false;
		}
	} else {
		for(candle of this.candles) {
			candle.light.intensity = 1.5;
			this.candlesIgnited = true;
		}
	}
};
