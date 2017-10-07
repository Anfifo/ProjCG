/**
 * input handling javascript
 * deals with all forms of input in this program
 *
 */



function InputHandler(){

    /**
     * necessary in order to preserve this when being called by event handlers
     * @type {InputHandler}
     */
    var self = this;

    var keyCodes = {
        a: 65,
        d: 68,
        p: 80,
        s: 83,
        t: 84,
        w: 87,
        up: 38,
        left: 37,
        right: 39,
        down: 40
    };

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


    var carControls;
    var car2Controls;

    this.addCarControls = function(carCtrls){
        carControls = carCtrls;
    };



    this.onKeyDown = function (e){
        'use strict';
        pressedKeys[e.keyCode] = true;

        if(carControls !== undefined && carControls !== null ){
            self.executeCarControls();
        }
        if(car2Controls !== undefined && car2Controls !== null){
            self.executeCar2Controls();
        }

        // toggle wireframe
        if(pressedKeys[keyCodes.t]){
            scene.traverse(function (node){
                if (node instanceof THREE.Mesh && node.geometry.type === 'BoxGeometry'){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            render();
        }

        //EASTER EGG create 2nd player car
        if(pressedKeys[keyCodes.p]){
            var car2 = createBasicCar(0,6.5,0, {color:0x42f44b});
            car2.scale.set(5,5,5);
            scene.add(car2);
            car2Controls = new CarControls(car2);
            animatables.push(car2Controls);
        }
    };



    this.onKeyRelease = function (e){
        pressedKeys[e.keyCode] = false;

        if(carControls !== undefined && carControls !== null ){
            self.executeCarControls();
        }
        if(car2Controls !== undefined && car2Controls !== null){
            self.executeCar2Controls();
        }
    };






    this.executeCarControls = function(){
        if (pressedKeys[keyCodes.up]){
            carControls.moveForward();
        }
        if (pressedKeys[keyCodes.down]){
            carControls.moveBackwards();
        }
        if (pressedKeys[keyCodes.left]){
            carControls.turnLeft();
        }
        if (pressedKeys[keyCodes.right]){
            carControls.turnRight();
        }

        if ( !pressedKeys[keyCodes.up] && !pressedKeys[keyCodes.down]){
            carControls.slowDown();
        }

        if (!pressedKeys[keyCodes.left] && !pressedKeys[keyCodes.right]){
            carControls.stopCurve();
        }
    };

    this.executeCar2Controls = function(){

        if (pressedKeys[keyCodes.w]){
            car2Controls.moveForward();
        }
        if (pressedKeys[keyCodes.s]){
            car2Controls.moveBackwards();
        }
        if (pressedKeys[keyCodes.a]){
            car2Controls.turnLeft();
        }
        if (pressedKeys[keyCodes.d]){
            car2Controls.turnRight();
        }

        if ( !pressedKeys[keyCodes.w] && !pressedKeys[keyCodes.s]){
            car2Controls.slowDown();
        }

        if (!pressedKeys[keyCodes.a] && !pressedKeys[keyCodes.d]){
            car2Controls.stopCurve();
        }

    };


}



