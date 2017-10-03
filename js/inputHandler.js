/**
 * input handling javascript
 * deals with all forms of input
 */

var carControls;

var wKey = 87;
var sKey = 83;
var aKey = 65;
var dKey = 68;
var tKey = 84;

/**
 * buffer with pressed keys so more than 1 key can be counted and active at the time
 * @type {{wKey: boolean, sKey: boolean, aKey: boolean, dKey: boolean}}
 */
var pressedKeys = {
    wKey: false,
    sKey: false,
    aKey: false,
    dKey: false,
    tKey: false
};


function updateCarMovement(){
    carControls.updateMovement();
}



function onKeyDown(e){
    'use strict';
    pressedKeys[e.keyCode] = true;

    if(carControls !== null){
        executeCarControls();
    }

    if(pressedKeys[tKey]){
        scene.traverse(function (node){
            if (node instanceof THREE.Mesh && node.geometry.type === 'BoxGeometry'){
                node.material.wireframe = !node.material.wireframe;
            }
        });
        render();
    }

}


function onKeyRelease(e){
    pressedKeys[e.keyCode] = false;
    executeCarControls();
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



