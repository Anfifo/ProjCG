function fibonacci(number) {

    var previous_first = 0, previous_second = 1, next = 1;

    for(var i = 2; i <= number; i++) {
        next = previous_first + previous_second;
        previous_first = previous_second;
        previous_second = next;
    }
    return next;
};

function drawStraightLine(dx,dz){
   for (var i = -485; i<=485; i+=30){
        createTorus(i+dx,20,-30+dz);
        createTorus(i+dx,20,30+dz); 
    }
}

function drawCurve(dx,dz) {
    createTorus(-3+dx,20,0+dz);
    createTorus(20+dx,20,-8+dz);
    createTorus(32+dx,20,-24+dz);
}
function placeCheerios(){
	
    drawStraightLine(0,0);

}