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
    this.basicMaterial = false;
    this.wireframeToggle = false;

    var keyCodes = {
        enter: 13,
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
        h: 72,
        l: 76,
        n: 78,
        p: 80,
        r: 82,
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
    pressedKeys[keyCodes.enter] = false;
    pressedKeys[keyCodes._1]    = false;
    pressedKeys[keyCodes._2]    = false;
    pressedKeys[keyCodes._3]    = false;
    pressedKeys[keyCodes._4]    = false;
    pressedKeys[keyCodes._5]    = false;
    pressedKeys[keyCodes.a]     = false;
    pressedKeys[keyCodes.b]     = false;
    pressedKeys[keyCodes.c]     = false;
    pressedKeys[keyCodes.d]     = false;
    pressedKeys[keyCodes.e]     = false;
    pressedKeys[keyCodes.f]     = false;
    pressedKeys[keyCodes.g]     = false;
    pressedKeys[keyCodes.h]     = false;
    pressedKeys[keyCodes.l]     = false;
    pressedKeys[keyCodes.n]     = false;
    pressedKeys[keyCodes.p]     = false;
    pressedKeys[keyCodes.r]     = false;
    pressedKeys[keyCodes.s]     = false;
    pressedKeys[keyCodes.t]     = false;
    pressedKeys[keyCodes.w]     = false;
    pressedKeys[keyCodes.up]    = false;
    pressedKeys[keyCodes.down]  = false;
    pressedKeys[keyCodes.left]  = false;
    pressedKeys[keyCodes.right] = false;
    pressedKeys[keyCodes.comma] = false;

    var car1;
    var car2;

    this.addCarControls = function(carCtrls){ car1 = carCtrls; };


    this.onKeyRelease = function (e){
        pressedKeys[e.keyCode] = false;

        if(car1 !== undefined && car1 !== null )
            self.executeCarControls();
        if(car2 !== undefined && car2 !== null)
            self.executeCar2Controls();
    };

    this.onKeyDown = function (e){
        'use strict';
        pressedKeys[e.keyCode] = true;

        if(car1 !== undefined && car1 !== null )
            self.executeCarControls();

        if(car2 !== undefined && car2 !== null)
            self.executeCar2Controls();

        if(pressedKeys[keyCodes.a])
            self.toggleWireFrame();

        //EASTER EGG create 2nd player car
        if(pressedKeys[keyCodes.p])
            if(!car2)
                self.createCar2();

        if(pressedKeys[keyCodes._1])
            switchCamera(0);
        if(pressedKeys[keyCodes._2])
            switchCamera(1);
        if(pressedKeys[keyCodes._3])
            switchCamera(2);
        if(pressedKeys[keyCodes._4])
            switchCamera(3);

        if(pressedKeys[keyCodes._5])
            if(car2 !== null)
               cameraHandler.setSplitScreen(true);

        if(pressedKeys[keyCodes.n])
            lightsHandler.dayNightTime();

        if(pressedKeys[keyCodes.c])
            lightsHandler.switchCandles();

        if(pressedKeys[keyCodes.g])
            self.toggleShading();

        if (pressedKeys[keyCodes.h])
            car1.toggleMediumLights();

        if(pressedKeys[keyCodes.l])
            self.toggleIllumination();

        if(pressedKeys[keyCodes.comma]){
            if(car2)
                car2.toggleLights();
            car1.toggleLights();
        }

        if((pressedKeys[keyCodes.s] && !car2) || pressedKeys[keyCodes.enter])
            togglePause();

        if(pressedKeys[keyCodes.r]){
            if(gameOver)
                requestGameRestart();
        }
    };

    this.executeCarControls = function(){
        if (pressedKeys[keyCodes.up]){ car1.moveForward();}
        if (pressedKeys[keyCodes.down]){ car1.moveBackwards(); }
        if (pressedKeys[keyCodes.left]){ car1.turnLeft(); }
        if (pressedKeys[keyCodes.right]){ car1.turnRight(); }

        if ( !pressedKeys[keyCodes.up] && !pressedKeys[keyCodes.down]){ car1.slowDown();}
        if (!pressedKeys[keyCodes.left] && !pressedKeys[keyCodes.right]){ car1.stopCurve();}
    };

    this.executeCar2Controls = function(){
        if (pressedKeys[keyCodes.e]){ car2.moveForward(); }
        if (pressedKeys[keyCodes.d]){ car2.moveBackwards(); }
        if (pressedKeys[keyCodes.s]){ car2.turnLeft(); }
        if (pressedKeys[keyCodes.f]){ car2.turnRight(); }

        if (!pressedKeys[keyCodes.e] && !pressedKeys[keyCodes.d]){ car2.slowDown(); }
        if (!pressedKeys[keyCodes.s] && !pressedKeys[keyCodes.f]){ car2.stopCurve(); }
    };


    this.createCar2 = function(){
        car2 = createMovingCar(0,6.5,0, {color:0x42f44b});
        cameraHandler.createCameraForObject(car2);
        scene.add(car2);
        car2.returnToStart();
        animatables.push(car2);
        car2.lightStatus = car1.lightStatus;
    };

}




InputHandler.prototype.toggleWireFrame = function(){
    var self = this;
    self.wireframeToggle = !self.wireframeToggle;
    scene.traverse( function(node) {
        if((node instanceof THREE.Mesh) ){
            node.material.wireframe = self.wireframeToggle;
        }
    });
    table.material.wireframe = false;
};

InputHandler.prototype.toggleShading = function(){
    var self = this;
    if (this.basicMaterial){
        if(self.currentShading === 'Phong')
            self.currentShading = "Gouraud";
        else
            self.currentShading = "Phong";
    }
    else if(self.currentShading === 'Phong'){
        self.currentShading = 'Gouraud';
        toggleToGouraud(self.wireframeToggle);
    }
    else{
        self.currentShading = 'Phong';
        toggleToPhong(self.wireframeToggle);
    }
};

InputHandler.prototype.toggleIllumination = function(){
    var self = this;
    if(!self.basicMaterial){
        scene.traverse( function(node) {
            if(node instanceof THREE.Mesh){
                var texture = node.material.map;
                node.material = new THREE.MeshBasicMaterial({
                    color: node.material.color,
                    wireframe: node.material.wireframe
                });
                if(texture){
                    node.material.map = texture;
                    node.material.needsUpdate = true;
                }
            }
        });
    }
    else if(self.currentShading === 'Phong')
        toggleToPhong(self.wireframeToggle);

    else
        toggleToGouraud(self.wireframeToggle);

    self.basicMaterial = !self.basicMaterial;
};



function toggleToGouraud(wireframe){
    table.toggleToGouraud(false);
    lightsHandler.toggleCandlesToGouraud(wireframe);

    for(var i = 0; i < startingLines.length; i++){
        startingLines[i].toggleToGouraud(wireframe);
    }

    animatables.forEach(function(element){
        element.toggleToGouraud(wireframe);
    } );
}

function toggleToPhong(wireframe){
    table.toggleToPhong(false);
    lightsHandler.toggleCandlesToPhong(wireframe);

    for(var i = 0; i < startingLines.length; i++){
        startingLines[i].toggleToPhong(wireframe);
    }

    animatables.forEach(function(element){
        element.toggleToPhong(wireframe);
    } );
}

function switchCamera(number){
    if(cameraHandler.splitScreenOn())
        cameraHandler.resize();
    cameraHandler.setSplitScreen(false);
    cameraHandler.updateSelectedCamera(number);
}
