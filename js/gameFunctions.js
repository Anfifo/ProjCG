var pausedSignBox;
var gameOverSignBox;




function togglePause(){
    gameRunning = ! gameRunning;

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


function switchCamera(number){

    if(cameraHandler.splitScreenOn())
        cameraHandler.resize();
    cameraHandler.setSplitScreen(false);
    cameraHandler.updateSelectedCamera(number);
}
