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

    var butter = new Butter(0, 0, 0);
    var orange = new Orange(25, 0, 0, 8);

    scene.add(butter);
    scene.add(orange);

}


function Orange(x, y, z, radius)
{
    'use strict';

    this.type = 'Orange';
    this.geometry = new THREE.SphereGeometry(radius,
                                            20,                         /* widthSegments */
                                            25,                         /* heightSegments */
                                            0,                          /* phiStart */
                                            2 * Math.PI,                /* phiLength */
                                            0,                          /* thetaStart */
                                            2 * Math.PI);               /* thetaLength */
    this.material = new THREE.MeshBasicMaterial({color: 0xa75715});
    var orange = new THREE.Mesh(this.geometry, this.material);

    THREE.Object3D.call(this);
    this.add(orange);

    this.position.set(x, y, z);


}

Orange.prototype.constructor = Orange;
Orange.prototype = Object.create(THREE.Object3D.prototype);


function Butter(x, y, z)
{
    'use strict';

    this.type = 'Butter';

    var baseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var baseGeometry = new THREE.BoxGeometry(15, 0.5, 20);
    var base = new THREE.Mesh(baseGeometry, baseMaterial);

    var butterMaterial = new THREE.MeshBasicMaterial({color: 0xffd830})
    var butterGeometry = new THREE.BoxGeometry(10, 5, 15);
    var butterBar = new THREE.Mesh(butterGeometry, butterMaterial);

    base.position.set(-2, -5, -2);
    butterBar.position.set(0, 0, 0);

    THREE.Object3D.call(this);
    this.add(base);
    this.add(butterBar);

    this.position.set(x, y, z);

}

Butter.prototype.constructor = Butter;
Butter.prototype = Object.create(THREE.Object3D.prototype);


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
