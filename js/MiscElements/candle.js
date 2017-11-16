


function Candle(x, y, z, texture)
{
    THREE.Object3D.call(this);

    this.type = 'Candle';

    this.reflectivity = 0;
    this.specular = 0x000000;
    this.shininess = 30;
    this.candleIntensity = 1;

    this.map = texture;

    var candleGeometry = new THREE.CylinderGeometry(5, 5, 27, 20, 1, false, 0, 2 * Math.PI);
    var candleMaterial = new THREE.MeshLambertMaterial({color: 0xbfb5a0, map: this.map});
    var candle = new THREE.Mesh(candleGeometry, candleMaterial);

    var wickGeometry = new THREE.CylinderGeometry(1, 1, 5, 20, 1, false, 0, 2 * Math.PI);
    var wickMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
    var wick = new THREE.Mesh(wickGeometry, wickMaterial);
    wick.position.set(0, 15, 0);

    this.light = new THREE.PointLight(0xfff9be,this.candleIntensity, 400, 2);

    this.light.position.set(0, 20, 0);

    this.lightHelper = new THREE.PointLightHelper(this.light, 3);
    this.lightHelper.material.wireframe = false;

    this.add(candle);
    this.add(wick);
    this.add(this.light);

    this.position.set(x, y, z);

}

Candle.prototype = Object.create(THREE.Object3D.prototype);

Candle.prototype.constructor = Candle;

Candle.prototype.toggleToPhong = function(wireframe) {
    this.children.forEach( function(node){
        if(node instanceof THREE.Mesh)
            node.material = new THREE.MeshPhongMaterial({
                color: node.material.color,
                wireframe: wireframe,
                reflectivity: 0,
                specular: 0x000000,
                shininess: 30,
                map: node.material.map
            });
    });
};

Candle.prototype.toggleToGouraud = function(wireframe) {
    this.children.forEach( function(node){
        if(node instanceof THREE.Mesh)
            node.material = new THREE.MeshLambertMaterial({
                color: node.material.color,
                wireframe: wireframe,
                map: node.material.map
            });
    });
};
