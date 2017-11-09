var pausedSignBox;
var gameOverSignBox;




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
        pausedSignBox = createPauseCube();
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
    init();
}



function switchCamera(number){

    if(cameraHandler.splitScreenOn())
        cameraHandler.resize();
    cameraHandler.setSplitScreen(false);
    cameraHandler.updateSelectedCamera(number);
}
