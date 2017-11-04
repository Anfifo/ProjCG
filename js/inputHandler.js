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
    this.currentShading = 'Gouraud';
    this.wireframeToggle = false;

    var keyCodes = {
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        l: 76,
        n: 78,
        p: 80,
        s: 83,
        t: 84,
        w: 87,
        up: 38,
        left: 37,
        right: 39,
        down: 40,
        comma: 188
    };

    var pressedKeys = {};
    pressedKeys[keyCodes._1] = false;
    pressedKeys[keyCodes._2] = false;
    pressedKeys[keyCodes._3] = false;
    pressedKeys[keyCodes._4] = false;
    pressedKeys[keyCodes._5] = false;
    pressedKeys[keyCodes.a] = false;
    pressedKeys[keyCodes.b] = false;
    pressedKeys[keyCodes.c] = false;
    pressedKeys[keyCodes.d] = false;
    pressedKeys[keyCodes.e] = false;
    pressedKeys[keyCodes.f] = false;
    pressedKeys[keyCodes.g] = false;
    pressedKeys[keyCodes.l] = false;
    pressedKeys[keyCodes.n] = false;
    pressedKeys[keyCodes.p] = false;
    pressedKeys[keyCodes.s] = false;
    pressedKeys[keyCodes.t] = false;
    pressedKeys[keyCodes.w] = false;
    pressedKeys[keyCodes.up] = false;
    pressedKeys[keyCodes.down] = false;
    pressedKeys[keyCodes.left] = false;
    pressedKeys[keyCodes.right] = false;
    pressedKeys[keyCodes.comma] = false;


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
            this.wireframeToggle = !this.wireframeToggle;
            scene.traverse( function(node) {
                if((node instanceof THREE.Mesh &&
                    !(node instanceof Table )) ){
                        node.material.wireframe = wireframeToggle;
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
            switchCamera(0);
        }

        if(pressedKeys[keyCodes._2]){
            switchCamera(1);
        }

        if(pressedKeys[keyCodes._3]){
            switchCamera(2);
        }

        if(pressedKeys[keyCodes._4]){
            switchCamera(3);
        }

        if(pressedKeys[keyCodes._5]){
           if(car2 !== null)
            cameraHandler.setSplitScreen(true);       
        }

        if(pressedKeys[keyCodes.n]){
            lightsHandler.dayNightTime();
        }

        if(pressedKeys[keyCodes.c]){
            lightsHandler.switchCandles();
        }


        if(pressedKeys[keyCodes.g]){
            scene.traverse( function(node) {
                if(node instanceof THREE.Mesh){
                    var wireframe = node.material.wireframe;
                    var color = node.material.color;

                    if(node.material.isMeshBasicMaterial){
                        if(self.currentShading === 'Phong')
                            self.currentShading = 'Gouraud';
                        else
                            self.currentShading = 'Phong';
                    }

                    else if (!node.material.isMeshPhongMaterial){
                        self.currentShading = 'Phong';
                        node.material = new THREE.MeshPhongMaterial({
                                        color: color,
                                        wireframe: wireframe});
                    }
                    else{
                        self.currentShading = 'Gouraud';
                        node.material = new THREE.MeshLambertMaterial({
                                        color: color,
                                        wireframe: wireframe});
                    }

                    node.needsUpdate=true;
        
                }
            });
        }

        if(pressedKeys[keyCodes.l]){
            scene.traverse( function(node) {
                if(node instanceof THREE.Mesh){
                    var wireframe = node.material.wireframe;
                    var color = node.material.color;

                    if(!node.material.isMeshBasicMaterial){
                        node.material = new THREE.MeshBasicMaterial({
                                        color: color,
                                        wireframe: wireframe});
                    }
                    else{
                        if(self.currentShading === 'Gouraud')
                            node.material = new THREE.MeshLambertMaterial({
                                            color: color,
                                            wireframe: wireframe});
                        else
                            node.material = new THREE.MeshPhongMaterial({
                                            color: color,
                                            wireframe: wireframe});
                    }

                    node.needsUpdate=true;
            
                }
            });
        }
        if(pressedKeys[keyCodes.comma]){
            car1.toggleLights();
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



function switchCamera(number){

    if(cameraHandler.splitScreenOn())
        cameraHandler.resize();
    cameraHandler.setSplitScreen(false);
    cameraHandler.updateSelectedCamera(number);
}