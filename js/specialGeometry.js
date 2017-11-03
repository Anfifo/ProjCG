/**
 * This file contains our versions of some geometries and meshes already created by 3js
 * the objective is to create these meshes from scratch with triangles
 */


/**
 * Cuboid class. The cuboid represents a cube-like 3d object, looks like this in 3D:
 *       ______
 *     /      /|
 *   /______/  |
 *  |      |   |
 *  |      |  /
 *  |______|/
 *
 * @param depth X
 * @param height Y
 * @param width Z
 * @param material given material for mesh
 * @constructor
 */
function CuboidMesh(depth, height, width, material){

    var vertices = getCuboidVertices(depth, height, width);

    var composingTrianglesVertices = computeAllTrianglesVertices(vertices, 8);

    material = material || new THREE.MeshBasicMaterial( { color: 0x000055 , wireframe:false} );

    var geometry = new THREE.Geometry();
    addVerticesToGeometry(composingTrianglesVertices, geometry);
    THREE.Mesh.call(this, geometry, material);
}

CuboidMesh.prototype = Object.create(THREE.Mesh.prototype);
//prevents issues with isinstance after inheritance
CuboidMesh.prototype.constructor = CuboidMesh;


/**
 * A Tringular Rectangular Prism is a triangular prism with a rect angle as one of it's angles in 3d it looks like this:
 *
 *  _______
 * |\      \
 * | \      \
 * |  \      \
 * |___\______\
 *
 * @param depth
 * @param height
 * @param width
 * @param material
 * @constructor
 */
function TriangularRectPrismMesh(depth, height, width, material){

    var nrOfVertices = 6;
    var vertices = getCuboidVertices(depth, height, width); // find vertices for a cuboid
    material = material || new THREE.MeshBasicMaterial( { color: 0x000055 , wireframe:false} );

    //the 2 vertices of a cuboid has that a triangular prism doesn't
    var vertexToRemove1 = [depth/2, height/2, width/2];
    var vertexToRemove2 = [depth/2, height/2, -width/2];
    removeVectorFromArray(vertexToRemove1,vertices);
    removeVectorFromArray(vertexToRemove2, vertices);

    var composingTrianglesVertices = computeAllTrianglesVertices(vertices, nrOfVertices);

    var geometry = new THREE.Geometry();
    addVerticesToGeometry(composingTrianglesVertices, geometry);
    THREE.Mesh.call(this, geometry, material);

}


TriangularRectPrismMesh.prototype = Object.create(THREE.Mesh.prototype);
//prevents issues with isinstance after inheritance
TriangularRectPrismMesh.prototype.constructor = TriangularRectPrismMesh;



/**
 * A triangular Prism is simply 2 triangular rectangular prisms together
 * in 3D it looks like this:
 *      /\
 *    /\  \
 *  /   \  \
 * /_____\/
 *
 * @param depth
 * @param height
 * @param width
 * @param material
 * @returns {TriangularPrismMesh}
 * @constructor
 */
function TriangularPrismObject(depth,height,width, material){

    // measures for each half of the triangle
    var rHeight = depth/2;
    var rDepth = height;
    var rWidth = width;
    //Creates 2 halves of the triangle
    var triangle1 = new TriangularRectPrismMesh(rDepth, rHeight, rWidth, material);
    var triangle2 = new TriangularRectPrismMesh(rDepth, rHeight, rWidth, material);

    THREE.Object3D.call(this);

    // places the 2 triangles in the proper position
    triangle1.translateY(rHeight/2);
    triangle2.rotateX(Math.PI);
    triangle2.translateY(rHeight/2);

    this.add(triangle1);
    this.add(triangle2);

}

TriangularPrismObject.prototype = Object.create(THREE.Object3D.prototype);
//prevents issues with isinstance after inheritance
TriangularPrismObject.prototype.constructor = TriangularPrismObject;




/**
 * A shape mesh will make a 2D-looking object with a given width on the Z axis
 * depending on the nrOfTriangles argument the output will be:
 * 3 a triangle
 * 4 a square
 * 5 a pentagon
 * 6 a hexagon
 * ...
 * more than 16 will start to look more and more like a circle
 *
 * @param radius
 * @param width
 * @param nrOfTriangles
 * @param material
 * @constructor
 */
function ShapeObject (radius, width, nrOfTriangles, material){
    var triangles  = [];
    var translateValue = -radius/2;
    var rotationIncrement = Math.PI/(nrOfTriangles/2);
    var tDepth = (Math.tan(rotationIncrement/2) * radius)*2; // opposite = adjacent * tg (angle);
    var tHeight = radius;
    var tWidth = width;
    var currentRotation = 0;
    var i;

    THREE.Object3D.call(this);
    nrOfTriangles = nrOfTriangles || 8; //default value

    for (i = 0; i < nrOfTriangles; i++){
        triangles[i] = new TriangularPrismObject(tDepth, tHeight, tWidth, material);
        triangles[i].rotateZ(currentRotation); // rotate horizontally
        currentRotation += rotationIncrement;
        triangles[i].translateX(translateValue); //translate based on radius

        this.add(triangles[i]);
    }
}


ShapeObject.prototype = Object.create(THREE.Object3D.prototype);
//prevents issues with isinstance after inheritance
ShapeObject.prototype.constructor = ShapeObject;






function addVerticesToGeometry(vertices, geom){
    var pos = 0;
    var i;

    for( i = 0; i < vertices.length; i+=3){
        var v1 = new THREE.Vector3(vertices[i][0],vertices[i][1],vertices[i][2]);
        var v2 = new THREE.Vector3(vertices[i+1][0],vertices[i+1][1],vertices[i+1][2]);
        var v3 = new THREE.Vector3(vertices[i+2][0],vertices[i+2][1],vertices[i+2][2]);

        geom.vertices.push(v1);
        geom.vertices.push(v2);
        geom.vertices.push(v3);
        geom.faces.push( new THREE.Face3( pos++, pos++, pos++ ));
        geom.computeFaceNormals();
    }
}


/**
 * Find what would be the vertices of a cuboid centered on (0,0,0) based on given attributes
 * @param depth
 * @param height
 * @param width
 * @returns {Array}
 */
function getCuboidVertices (depth, height, width){
    var i,j,k;
    var temp_height, temp_depth, temp_width;
    var vertices = [];

    var h  = height/2;
    var d = depth/2;
    var l = width/2;

    // calculates all 8 points of a cuboid
    for(i = 0; i <2; i++){
        for(j = 0; j < 2; j++){
            for( k = 0; k < 2; k++){
                // changes de values for each iteration
                temp_width  = k === 0 ? l : -l;
                temp_height = j === 0 ? h : -h;
                temp_depth  = i === 0 ? d : -d;
                vertices.push([temp_depth, temp_height, temp_width]);
            }
        }
    }
    return vertices;
}


/**
 * Finds the 3 adjacent vertices to a given vertex depending on the geometry
 * If it's a cuboid it will have 8 vertices
 * If it's a triangular prism it will have 6
 * @param vertex
 * @param nrOfObjectVertices
 * @returns {[adj1,adj2,adj3]}
 */
function getAdjacentVertices( vertex, nrOfObjectVertices){
    var adj1 = [], adj2 = [], adj3 = [];
    var x,y,z;
    x = vertex[0]; y = vertex[1]; z = vertex[2];

    //adjacent vertices of a cuboid
    if(nrOfObjectVertices === 8){
        adj1 = [-x, y, z];
        adj2 = [x, -y, z];
        adj3 = [x, y, -z];
    }

    //imagine the triangle |\
    //                     | \
    //                     |__\
    //adjacent vertices of a triangular prism
    if(nrOfObjectVertices === 6){
        if((y > 0 && x < 0)  ){ // adjacent to top
            adj1 = [-x, -y, z];
            adj2 = [x, -y, z];
            adj3 = [x, y, -z];
        }
        else{
            if ((y < 0 && x > 0)){ // adjacent to lower right points
                adj1 = [-x, -y, z];
                adj2 = [-x, y, z];
                adj3 = [x, y, -z];
            }else{ // adjacent to bottom left
                adj1 = [-x, y, z];
                adj2 = [x, -y, z];
                adj3 = [x, y, -z];
            }
        }
    }

    return [adj1, adj2, adj3];
}


/**
 * Given a list of vertices, it returns a new list that results of uniting all verticies with their adjacent in triangles
 * @param vertices
 * @param nrOfObjectVertices
 * @returns {Array}
 */
function computeAllTrianglesVertices(vertices, nrOfObjectVertices){
    var position = 0;
    var i;
    var vertex;

    // has X vertices, each vertice will have 3 triangles, each triangle needs 3 vector, each vectors has 3 values
    // X vertices * 3 Triangles * 3 Vectors * 3 Points;
    var triangles = [];

    if(nrOfObjectVertices === 6)
        return computeAllTrianglesVerticesOfTriangularPrism(vertices, nrOfObjectVertices);

    for ( i = 0; i < vertices.length; i++){
        vertex = vertices[i];

        // only half of the vertices are needed to represent a cube
        if(!    ((hasSameSign(vertex[0], vertex[2])  && vertex[1] > 0) || // x sign = z sign and y > 0
                (!hasSameSign(vertex[0], vertex[2])) && vertex[1] < 0)) // x sign != z sign and y < 0
            continue;

        var adjacentVertices = getAdjacentVertices(vertex, nrOfObjectVertices);
        adjacentVertices.push(adjacentVertices[0]); // avoid out of range situation; it loops back to first members

        addTrianglesToList(vertex, adjacentVertices, triangles);
    }
    return triangles;
}

/**
 * Particular version of computing triangles for a triangular prism
 * @param vertices
 * @param nrOfObjectVertices
 * @returns {Array}
 */
function computeAllTrianglesVerticesOfTriangularPrism(vertices, nrOfObjectVertices){
    var triangles = [];
    var vertex;
    var i;

    for ( i = 0; i < vertices.length; i++){
        vertex = vertices[i];
        var adjacentVertices = getAdjacentVertices(vertex, nrOfObjectVertices);

        if (vertex[0] < 0 && vertex[1]  > 0 && vertex[2] > 0 )
            var topLeftVertex = vertex;

        if (vertex[0] < 0 && vertex[1] < 0 && vertex [2] < 0 )
            var bottomRightBackVertex = vertex;

        if (vertex[0] > 0 && vertex[1] < 0 && vertex[2] < 0 )
            var bottomRightFrontVertex = vertex;

        if (vertex[0] > 0 && vertex[1] < 0 && vertex[2] > 0 )
            var bottomLeftFrontVertex = vertex;

        if (vertex[0] < 0 && vertex[1]  > 0 && vertex[2] < 0 ){
            addTrianglesToList(vertex, adjacentVertices, triangles);
            var topRightVertex = vertex;
        }
        if (vertex[0] < 0 && vertex[1] < 0 && vertex [2] > 0 ){
            var bottomLeftBackVertex = vertex;
            addTrianglesToList(vertex, adjacentVertices, triangles);
        }

    }
    addTrianglesToList(topLeftVertex, [bottomRightFrontVertex, bottomLeftFrontVertex], triangles);
    addTrianglesToList(bottomRightBackVertex, [bottomRightFrontVertex, bottomLeftFrontVertex], triangles);


    return triangles;
}


function addTrianglesToList(vertex, adjacentVertices, triangles){
    var i;
    // so when it would get out of range it goes back to the first member
    adjacentVertices.push(adjacentVertices[0]);

    for( i = 0; i < adjacentVertices.length - 1 ; i++){
        triangles.push(vertex);
        triangles.push(adjacentVertices[i]);
        triangles.push(adjacentVertices[i+1]);
    }
}


/**
 * Compares 2 arrays
 * returns true if array1 has exactly the same components and length as array2
 * @param array1
 * @param array2
 * @returns {boolean}
 */
function equalArrays(array1, array2){
    if(array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++)
        if (array1[i] !== array2[i])
            return false;
    return true;
}


/**
 * removes an array element from an array of arrays (matrix)
 * @param element
 * @param array
 */
function removeVectorFromArray(element, array){
    var i;
    for ( i = 0; i < array.length; i++)
        if(equalArrays(array[i], element))
            array.splice(i, 1)
}


function hasSameSign(element1, element2){
    return (element1 > 0 && element2 > 0) || (element1 < 0 && element2 < 0)
}


