/**
 * Rotates a 2D Point
 * @param {Number} cx  
 * @param {Number} cy  
 * @param {Number} x  
 * @param {Number} y
 * @param {Number} angle  
 * @return {Array} [nx, ny]
 */
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function linear_function(m, b, x) {
	return m*x + b;
}
function draw_half_loop(cx, cy, x, y, delta_angle, properties){
   var pos, cheerio;
   
   for (var i = 0; i <=180; i+=delta_angle) {
        pos = rotate(cx,cy,x,y,i);
        properties.position.x = pos[0];
        properties.position.z = pos[1];
        properties.color = Math.random()*0xffffff;
        scene.add(new Cheerio( properties));
    }
}

function draw_line(xi, xf, m, b, properties){
	for (var x = xi; x <= xf; x+= 50){
		properties.position.x = x;
		properties.position.z = linear_function(m,b,x);
		properties.color = Math.random()*0xffffff;
		scene.add( new Cheerio (properties));
	}
}

function draw_infinity_track(cheerioProperties) {

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
	draw_line(-150, 150, 0.5, 0, cheerioProperties);
	draw_line(-150, 150, -0.5, 0, cheerioProperties);

}