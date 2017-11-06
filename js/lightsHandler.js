
function LightsHandler( dimensions ){
	this.directionalLight = new THREE.DirectionalLight( 0x404040 , 3);
	scene.add(this.directionalLight);
	this.dayTime = true;
	this.candles = [];
	this.candlesIgnited = true;
	this.createCandles();
}
LightsHandler.prototype.createCandles = function () {
	var y = 20;

	var candle1 = new Candle(-335, y, 170);
	this.candles.push(candle1);
	scene.add(candle1);
	scene.add(candle1.lightHelper);

	var candle2 = new Candle(335, y, 175);
	this.candles.push(candle2);
	scene.add(candle2);
	scene.add(candle2.lightHelper);

	var candle3 = new Candle(-260, y, -40);
	this.candles.push(candle3);
	scene.add(candle3);
	scene.add(candle3.lightHelper);

	var candle4 = new Candle(0, y, 150);
	this.candles.push(candle4);
	scene.add(candle4);
	scene.add(candle4.lightHelper);

	var candle5 = new Candle(-70, y, -150);
	this.candles.push(candle5);
	scene.add(candle5);
	scene.add(candle5.lightHelper);

	var candle6 = new Candle(220, y, -70);
	this.candles.push(candle6);
	scene.add(candle6);
	scene.add(candle6.lightHelper);

};

LightsHandler.prototype.dayNightTime = function(){
	if(this.dayTime)
		scene.remove(this.directionalLight);

	else
		scene.add(this.directionalLight);

	this.dayTime = !this.dayTime;
};

LightsHandler.prototype.switchCandles = function(){
	if (this.candlesIgnited) {
		for (candle of this.candles) {
			candle.light.intensity = 0;
			candle.lightHelper.visible = false;
			this.candlesIgnited = false;
		}
	} else {
		for(candle of this.candles) {
			candle.light.intensity = 1.5;
			candle.lightHelper.visible = true;
			this.candlesIgnited = true;
		}
	}
};


LightsHandler.prototype.toggleCandlesToPhong = function(wireframe){
   for(var i = 0; i < this.candles.length; i++)
    this.candles[i].toggleToPhong(wireframe);
}

LightsHandler.prototype.toggleCandlesToGouraud = function(wireframe){
   for(var i = 0; i < this.candles.length; i++)
    this.candles[i].toggleToGouraud(wireframe);
}