function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function drawStraightLine(x1,x2){
   for (var i = x1; i<=x2; i+=25){
        createTorus(i,20,-30);
        createTorus(i,20,30); 
    }
}

function drawCurvedLine(cx,cy,x,y,delta_a,a1,a2) {
   var pos;
   for (var i = a1; i < a2; i+=delta_a) {
        pos = rotate(cx,cy,x,y,i);
        createTorus(pos[0],20,pos[1]);
    }
}

function placeCheerios(){
	
    drawCurvedLine(0,0,30,30,30,-180,180);
    drawCurvedLine(0,0,72,72,12,-180,150);


    var pos = rotate(0,0,87,87,-180);
    createTorus(pos[0],20,pos[1]);

    pos = rotate(0,0,87,87,150);
    createTorus(pos[0],20,pos[1]);

    drawCurvedLine(0,0,102,102,9,-180,154);
    drawCurvedLine(0,0,144,144,6,-180,180);

    drawCurvedLine(-352,0,-300,0,25,-180,170);
    drawCurvedLine(-352,0,-258,0,13,-180,180);

    drawCurvedLine(352,0,300,0,25,-180,170);
    drawCurvedLine(352,0,258,0,13,-180,180);
}