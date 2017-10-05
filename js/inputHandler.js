/**
 * input handling javascript
 * deals with all forms of input
 */

var carControls;
var car2Controls;

var wKey = 87;
var sKey = 83;
var aKey = 65;
var dKey = 68;
var tKey = 84;

var upKey = 38;
var leftKey = 37;
var rightKey = 39;
var downKey = 40;

var pKey = 80;

/**
 * buffer with pressed keys so more than 1 key can be counted and active at the time
 * @type {{wKey: boolean, sKey: boolean, aKey: boolean, dKey: boolean}}
 */
var pressedKeys = {
    wKey: false,
    sKey: false,
    aKey: false,
    dKey: false,

    tKey: false,
    pKey:false,

    upKey:false,
    leftKey:false,
    rightKey:false,
    downKey:false
};


function updateCarMovement(){
    if(carControls !== undefined && carControls !== null ){
        carControls.updateMovement();
    }
    if(car2Controls !== undefined && car2Controls !== null){
        car2Controls.updateMovement();
    }
}



function onKeyDown(e){
    'use strict';
    pressedKeys[e.keyCode] = true;

    if(carControls !== undefined && carControls !== null ){
        executeCarControls();
    }
    if(car2Controls !== undefined && car2Controls !== null){
        executeCar2Controls();
    }

    if(pressedKeys[tKey]){
        scene.traverse(function (node){
            if (node instanceof THREE.Mesh && node.geometry.type === 'BoxGeometry'){
                node.material.wireframe = !node.material.wireframe;
            }
        });
        render();
    }

    if(pressedKeys[pKey]){
        var car2 = createBasicCar(0,6.5,0, {color:0x42f44b});
        car2.scale.set(5,5,5);
        scene.add(car2);
        car2Controls = new CarControls(car2);
    }
}


function onKeyRelease(e){
    pressedKeys[e.keyCode] = false;

    if(carControls !== undefined && carControls !== null ){
        executeCarControls();
    }
    if(car2Controls !== undefined && car2Controls !== null){
        executeCar2Controls();
    }
}



function executeCarControls(){

    if (pressedKeys[wKey]){
        carControls.moveForward();
    }
    if (pressedKeys[sKey]){
        carControls.moveBackwards();
    }
    if (pressedKeys[aKey]){
        carControls.turnLeft();
    }
    if (pressedKeys[dKey]){
        carControls.turnRight();
    }

    if ( !pressedKeys[wKey] && !pressedKeys[sKey]){
        carControls.slowDown();
    }

    if (!pressedKeys[aKey] && !pressedKeys[dKey]){
        carControls.stopCurve();
    }

}

function executeCar2Controls(){
    if (pressedKeys[upKey]){
        car2Controls.moveForward();
    }
    if (pressedKeys[downKey]){
        car2Controls.moveBackwards();
    }
    if (pressedKeys[leftKey]){
        car2Controls.turnLeft();
    }
    if (pressedKeys[rightKey]){
        car2Controls.turnRight();
    }

    if ( !pressedKeys[upKey] && !pressedKeys[downKey]){
        car2Controls.slowDown();
    }

    if (!pressedKeys[leftKey] && !pressedKeys[rightKey]){
        car2Controls.stopCurve();
    }
}



