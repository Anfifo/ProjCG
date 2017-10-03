/*global THREE*/


var camera, scene, renderer;

function createCamera()
{
    'use strict';

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);

}

function createScene()
{
    scene = new THREE.Scene();
    //scene.add(new THREE.AxisHelper(10));
    createButter();
    createOrange();

}

function createButter()
{
    'use strict';

    var butterBaseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var butterBaseGeometry = new THREE.BoxGeometry(15, 0.5, 20);
    var butterBase = new THREE.Mesh(butterBaseGeometry, butterBaseMaterial);


    var butterMaterial = new THREE.MeshBasicMaterial({color: 0xffd830})
    var butterGeometry = new THREE.BoxGeometry(10, 5, 15);
    var butterBar = new THREE.Mesh(butterGeometry, butterMaterial);


    butterBase.position.set(-2, -5, -2);
    butterBar.position.set(0, 0, 0);

    var butter = new THREE.Object3D();
    butter.add(butterBar);
    butter.add(butterBase);

    butter.position.set(0, 0, 0);

    scene.add(butter);

}

function createOrange()
{
    'use strict';

    var orangeMaterial = new THREE.MeshBasicMaterial({color: 0xa75715});
    var orangeGeometry = new THREE.SphereGeometry(8, 20, 25, 0, 2 * Math.PI, 0, 2 * Math.PI);
    var orange = new THREE.Mesh(orangeGeometry, orangeMaterial);

    orange.position.set(25, 0, 0);

    scene.add(orange);

}

function onResize()
{
    'use strict';

    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();


}

function render()
{
    'use strict';

    requestAnimationFrame(render);
    renderer.render(scene, camera);

}

function init()
{
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    render();

    window.addEventListener('resize', onResize);

}
