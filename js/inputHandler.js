/**
 * input handling javascript
 * deals with all forms of input
 */

var carControls;
var car2Controls;


var keyCodes ={
    a: 65,
    d: 68,
    p: 80,
    s: 83,
    t: 84,
    w: 87,
    up: 38,
    left:37,
    right: 39,
    down: 40
};



/**
 * buffer with pressed keys so more than 1 key can be counted and active at the time
 * @type {{keyCodes.w: boolean, keyCodes.s: boolean, keyCodes.a: boolean, keyCodes.d: boolean}}
 */

var pressedKeys = {};
pressedKeys[keyCodes.a] = false;
pressedKeys[keyCodes.d] = false;
pressedKeys[keyCodes.p] = false;
pressedKeys[keyCodes.s] = false;
pressedKeys[keyCodes.t] = false;
pressedKeys[keyCodes.w] = false;
pressedKeys[keyCodes.up] = false;
pressedKeys[keyCodes.down] = false;
pressedKeys[keyCodes.left] = false;
pressedKeys[keyCodes.right] = false;





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

    if(pressedKeys[keyCodes.t]){
        scene.traverse(function (node){
            if (node instanceof THREE.Mesh && node.geometry.type === 'BoxGeometry'){
                node.material.wireframe = !node.material.wireframe;
            }
        });
        render();
    }

    if(pressedKeys[keyCodes.p]){
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

    if (pressedKeys[keyCodes.w]){
        carControls.moveForward();
    }
    if (pressedKeys[keyCodes.s]){
        carControls.moveBackwards();
    }
    if (pressedKeys[keyCodes.a]){
        carControls.turnLeft();
    }
    if (pressedKeys[keyCodes.d]){
        carControls.turnRight();
    }

    if ( !pressedKeys[keyCodes.w] && !pressedKeys[keyCodes.s]){
        carControls.slowDown();
    }

    if (!pressedKeys[keyCodes.a] && !pressedKeys[keyCodes.d]){
        carControls.stopCurve();
    }

}

function executeCar2Controls(){
    if (pressedKeys[keyCodes.up]){
        car2Controls.moveForward();
    }
    if (pressedKeys[keyCodes.down]){
        car2Controls.moveBackwards();
    }
    if (pressedKeys[keyCodes.left]){
        car2Controls.turnLeft();
    }
    if (pressedKeys[keyCodes.right]){
        car2Controls.turnRight();
    }

    if ( !pressedKeys[keyCodes.up] && !pressedKeys[keyCodes.down]){
        car2Controls.slowDown();
    }

    if (!pressedKeys[keyCodes.left] && !pressedKeys[keyCodes.right]){
        car2Controls.stopCurve();
    }
}



