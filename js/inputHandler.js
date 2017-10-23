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
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        a: 65,
        d: 68,
        e: 69,
        f: 70,
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
    pressedKeys[keyCodes._1] = false;
    pressedKeys[keyCodes._2] = false;
    pressedKeys[keyCodes._3] = false;
    pressedKeys[keyCodes._4] = false;
    pressedKeys[keyCodes._5] = false;
    pressedKeys[keyCodes.a] = false;
    pressedKeys[keyCodes.d] = false;
    pressedKeys[keyCodes.e] = false;
    pressedKeys[keyCodes.f] = false;
    pressedKeys[keyCodes.p] = false;
    pressedKeys[keyCodes.s] = false;
    pressedKeys[keyCodes.t] = false;
    pressedKeys[keyCodes.w] = false;
    pressedKeys[keyCodes.up] = false;
    pressedKeys[keyCodes.down] = false;
    pressedKeys[keyCodes.left] = false;
    pressedKeys[keyCodes.right] = false;


    var car1;
    var car2;

    this.addCarControls = function(carCtrls){
        car1 = carCtrls;
    };



    this.onKeyDown = function (e){
        'use strict';
        pressedKeys[e.keyCode] = true;

        if(car1 !== undefined && car1 !== null ){
            self.executeCarControls();
        }
        if(car2 !== undefined && car2 !== null){
            self.executeCar2Controls();
        }

        // toggle wireframe
        if(pressedKeys[keyCodes.a]){
            scene.traverse( function(node) {
                if(node instanceof THREE.Mesh &&
                    !(node instanceof Table || node instanceof Cheerio) ){
                    node.material.wireframe = !node.material.wireframe;
                    if (node.geometry.type === 'TorusGeometry'){
                        console.log("Rodas");
                    }
                    if (node.geometry.type === "ExtrudeGeometry"){
                        console.log("Vidros");
                    }
                }
            });
            // render();
        }

        //EASTER EGG create 2nd player car
        if(pressedKeys[keyCodes.p]){
            car2 = createMovingCar(0,6.5,0, {color:0x42f44b});
            cameraHandler.createCameraForObject(car2);
            scene.add(car2);
            car2.returnToStart();
            animatables.push(car2);
        }

        if(pressedKeys[keyCodes._1]){
            cameraHandler.setSplitScreen(false);  
            cameraHandler.updateSelectedCamera(0);
        }

        if(pressedKeys[keyCodes._2]){
            cameraHandler.setSplitScreen(false);  
            cameraHandler.updateSelectedCamera(1);
        }

        if(pressedKeys[keyCodes._3]){
            cameraHandler.setSplitScreen(false); 
            cameraHandler.updateSelectedCamera(2);        
        }

        if(pressedKeys[keyCodes._4]){
            cameraHandler.setSplitScreen(false);  
            cameraHandler.updateSelectedCamera(3);        
        }

        if(pressedKeys[keyCodes._5]){
           if(car2 !== null)
            cameraHandler.setSplitScreen(true);       
        }
    };



    this.onKeyRelease = function (e){
        pressedKeys[e.keyCode] = false;

        if(car1 !== undefined && car1 !== null ){
            self.executeCarControls();
        }
        if(car2 !== undefined && car2 !== null){
            self.executeCar2Controls();
        }
    };






    this.executeCarControls = function(){
        if (pressedKeys[keyCodes.up]){
            car1.moveForward();
        }
        if (pressedKeys[keyCodes.down]){
            car1.moveBackwards();
        }
        if (pressedKeys[keyCodes.left]){
            car1.turnLeft();
        }
        if (pressedKeys[keyCodes.right]){
            car1.turnRight();
        }

        if ( !pressedKeys[keyCodes.up] && !pressedKeys[keyCodes.down]){
            car1.slowDown();
        }

        if (!pressedKeys[keyCodes.left] && !pressedKeys[keyCodes.right]){
            car1.stopCurve();
        }
    };

    this.executeCar2Controls = function(){

        if (pressedKeys[keyCodes.e]){
            car2.moveForward();
        }
        if (pressedKeys[keyCodes.d]){
            car2.moveBackwards();
        }
        if (pressedKeys[keyCodes.s]){
            car2.turnLeft();
        }
        if (pressedKeys[keyCodes.f]){
            car2.turnRight();
        }

        if ( !pressedKeys[keyCodes.e] && !pressedKeys[keyCodes.d]){
            car2.slowDown();
        }

        if (!pressedKeys[keyCodes.s] && !pressedKeys[keyCodes.f]){
            car2.stopCurve();
        }

    };


}



