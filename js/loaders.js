

// Textures
var tableTexture;
var orangeTexture;
var butterTexture;
var candleTexture;
var pausedTexture;
var gameOverTexture;
var cheerioTexture;

function loadTextures(){
    tableTexture    = new THREE.TextureLoader().load( 'Textures/prettyBlueChess.png' );
    orangeTexture   = new THREE.TextureLoader().load( 'Textures/orngtext.jpg'        );
    butterTexture   = new THREE.TextureLoader().load( 'Textures/buttertext.jpg'      );
    candleTexture   = new THREE.TextureLoader().load( 'Textures/candletext.jpg'      );
    pausedTexture   = new THREE.TextureLoader().load( 'Textures/paused2.jpg'         );
    cheerioTexture  = new THREE.TextureLoader().load( 'Textures/cheeriotext.jpg'     );
    gameOverTexture = new THREE.TextureLoader().load( 'Textures/gameOver.jpg'        );
}


function createTable(){
    var texture = tableTexture;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(1,1);

    var properties = {
        width: 1000,
        height: 20,
        depth: 500,
        //color: 0x9da4a8,
        color:0xdddddd,
        wireframe: false,
        position: { x: 0, y: 0, z: 0},
        map:texture
    };
    return new Table(properties);
}



function addButters(){
    var butters = [];

    var butter = new Butter(-400, 15, 150);
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(0, 15, -150);
    butter.rotation.y = Math.PI/2;
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(400, 15, -150);
    butter.rotation.y = Math.PI/2;
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(-80, 15, 200);
    butter.rotation.y = -Math.PI/2;
    scene.add(butter);
    butters.push(butter);

    butter = new Butter(-440, 15, -60);
    butter.rotation.y = -Math.PI;
    scene.add(butter);
    butters.push(butter);

    return butters;
}




function addOranges(){
    var oranges = [];
    oranges[0] = new Orange(80, 33, 200 );
    scene.add(oranges[0]);

    oranges[1] = new Orange(400,33,125);
    scene.add(oranges[1]);

    oranges[2] = new Orange(-370,33, -180);
    scene.add(oranges[2]);

    setInterval(function() {
        if(gameRunning)
            for (var i = 0; i < oranges.length; i++) {
            if (oranges[i].speed + 20 < oranges[i].maxSpeed)
                oranges[i].speed += 20;
            else
                oranges[i].speed += oranges[i].maxSpeed - oranges[i].speed;
        }
    }, 10000);

    return oranges;
}


function createTrack(){

    var cheerioProperties = {
        radius: 7,
        tube: 2.7,
        radialSegments: 5,
        tubularSegments: 20,
        arc: Math.PI * 2,
        color: 0xffffff,
        wireframe: false,
        position: { x: 0, y: 13, z: 0},
        rotation: { x: Math.PI/2 }
    };

    return new InfinityTrack(cheerioProperties);
}