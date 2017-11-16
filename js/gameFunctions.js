var pausedSignBox;
var lives;




function togglePause(){
    gameRunning = ! gameRunning;

    if(gameOver)
        return;

    if(gameRunning){
        cameraHandler.stopPauseCamera();
        if(pausedSignBox){
            scene.remove(pausedSignBox);
            pausedSignBox = undefined;
        }
    }
    else{
        cameraHandler.selectPauseCamera();
        pausedSignBox = createPauseCube(pausedTexture);
        scene.add(pausedSignBox);
    }
}


function endGame(){
    gameOver = true;
}

function requestGameRestart(){
    requestedRestart = true;
}

function restartGame(){
    document.body.removeChild(renderer.domElement);

    window.removeEventListener("resize", onResize);
    window.removeEventListener("keydown", inputHandler.onKeyDown);
    window.removeEventListener("keyup", inputHandler.onKeyRelease);

    init();
}

function restoreLives(){
    var x = 28;
    lives = [];
    for(var i = 0; i < 5; i++, x-= 15){

        var life = new BasicCar(x,-3,0);
        //life.scale.set(3,3,3);
        life.toggleToBasic(false);
        gameStatusScene.add(life);
        this.lives.push(life);
    }
}

function removeLife(car){
    var lifeLost = this.lives.pop();
    car.timeSinceLastDeath = 0;
    gameStatusScene.remove(lifeLost);
    if(!lives.length){
        endGame();
        cameraHandler.selectPauseCamera();
        pausedSignBox = createPauseCube(gameOverTexture);
        scene.add(pausedSignBox);
    }
}



