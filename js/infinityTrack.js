/**
 * Rotates a 2D Point
 * @param x position of the loops center
 * @param y position of the loops center
 * @param x position of the initial point  
 * @param y position of the initial point
 * @param rotation angle
 * @return {Array} rotated point
 */
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

/**
 * Finds the y coordinate for a point in a linear function
 * @param x postion
 * @return y position
 */
function linear_function(m, b, x) {
	return m*x + b;
}


/**
 * Class InfinityTrack
 *
 * This track "inherits" from THREE.3DObject;
 * It is a Object 3D composed of sereveral Cheerios in the infinity shape
 *
 * For more information on Object 3D check three.js documentation
 */


 /**
 * Class Constructor
 * @param properties {radius, tube, radialSeguements, tubularSegments, arc, color, wireframe, position {x,y,z}}
 * @constructor
 */
function InfinityTrack(properties) {
	THREE.Object3D.call(this);

	this.properties = properties;
	this.cheerios = [];
	this.startLinePosition = [347, 20, 12];

	this.getCheerios = function(){return this.cheerios};

	/////////////////// OUTTER LOOP //////////////////
	this.draw_half_loop(200,0,200,200,15);
	this.draw_half_loop(-200,0,-200,-200,15);
	
	//STRAIGHT PART 
	this.draw_line(-150, -50, -0.5, 100);
	this.draw_line(-150, 0, 0.5, -100);
	this.draw_line(50, 150, -0.5, -100);
	this.draw_line(0, 150, 0.5, 100);
	
	/////////////////// INNER LOOP ///////////////////
	this.draw_half_loop(200,0,200,100,25);
	this.draw_half_loop(-200,0,-200,-100,25);

	//STRAIGHT PART0
	this.draw_line(-150, 0, 0.5, 0);
	this.draw_line(-150, -50, -0.5, 0);
	this.draw_line(50, 150, 0.5, 0);
	this.draw_line(50, 150, -0.5, 0);

	this.start_line(347,20,0);
	this.start_line(347,20,12);
	
}

/**
 * adds to InfinityTrack class all method and attributes
 */
InfinityTrack.prototype = Object.create(THREE.Object3D.prototype);

/**
 * prevents issues with isInstance after BasiCar inheritance from THREE.Object3D
 */
InfinityTrack.prototype.constructor = InfinityTrack;


/**
 * draws an half loop of cheerios
 * @param x position of the loops center
 * @param y position of the loops center
 * @param x position of the initial point  
 * @param y position of the initial point
 * @param angle between each cheerio
 */
InfinityTrack.prototype.draw_half_loop = function(cx, cy, x, y, delta_angle){
   var pos, cheerio;
   
   for (var i = 0; i <=180; i+=delta_angle) {
        pos = rotate(cx,cy,x,y,i);
        this.properties.position.x = pos[0];
        this.properties.position.z = pos[1];
        this.properties.color = Math.random()*0xffffff;
        var cheerio = new Cheerio( this.properties);
        this.cheerios.push(cheerio);
        this.add(cheerio);
    }
};

/**
 * draws a straight line of cheerios
 * @param x position of the initial point
 * @param x position of the final point
 * @param slope of the line
 * @param y position of intersection with the y-axis
 */
InfinityTrack.prototype.draw_line = function(xi, xf, m, b){
	for (var x = xi; x <= xf; x+= 50){
		this.properties.position.x = x;
		this.properties.position.z = linear_function(m,b,x);
		this.properties.color = Math.random()*0xffffff;
        var cheerio = new Cheerio( this.properties);
        this.cheerios.push(cheerio);
        this.add(cheerio);	}
};

/**
 * draws the starting line for the track
 */
InfinityTrack.prototype.start_line = function(x,y,z){
	properties = {
        width: 80,
        height: 0.01,
        depth: 8,
        color: Math.random() * 0xffffff,
        wireframe: false,
        position: {
            x: x,
            y: y,
            z: z
        }
    };
	var startingLine = new Table (properties);
	this.add(startingLine);
};


