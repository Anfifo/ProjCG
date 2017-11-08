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

    var composingTrianglesVertices = computeCuboidVertices(vertices);

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

    var vertices = getCuboidVertices(depth, height, width); // find vertices for a cuboid
    material = material || new THREE.MeshBasicMaterial( { color: 0x000055 , wireframe:false} );

    //the 2 vertices of a cuboid has that a triangular prism doesn't
    var vertexToRemove1 = [depth/2, height/2, width/2];
    var vertexToRemove2 = [depth/2, height/2, -width/2];
    removeVectorFromArray(vertexToRemove1,vertices);
    removeVectorFromArray(vertexToRemove2, vertices);


    var composingTrianglesVertices = computeTriangularPrismVertices(vertices);

    var geometry = new THREE.Geometry();
    addVerticesToGeometry(composingTrianglesVertices, geometry);

    THREE.Mesh.call(this, geometry, material);

}

TriangularRectPrismMesh.prototype = Object.create(THREE.Mesh.prototype);
//prevents issues with isinstance after inheritance
TriangularRectPrismMesh.prototype.constructor = TriangularRectPrismMesh;






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
function ShapeMesh (radius, width, nrOfTriangles, material){

    nrOfTriangles = nrOfTriangles || 8; //default value

    var vertices = getShapeVertices(nrOfTriangles, radius, width);
    var positiveZVertices = vertices[0];
    var negativeZVertices = vertices[1];

    var composingTrianglesVertices = computeShapeVertices(positiveZVertices, negativeZVertices, width, nrOfTriangles);

    material = material || new THREE.MeshBasicMaterial( { color: 0x000055 , wireframe:false} );

    var geometry = new THREE.Geometry();
    addVerticesToGeometry(composingTrianglesVertices, geometry);
    THREE.Mesh.call(this, geometry, material);
}


ShapeMesh.prototype = Object.create(THREE.Mesh.prototype);
//prevents issues with isinstance after inheritance
ShapeMesh.prototype.constructor = ShapeMesh;





// AUXILIARY FUNCTIONS


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
 * @returns {[adj1,adj2,adj3]}
 */
function getCuboidAdjacentVertices(vertex){
    var adj1, adj2, adj3;
    var x,y,z;
    x = vertex[0]; y = vertex[1]; z = vertex[2];

    adj1 = [-x, y, z];
    adj2 = [x, -y, z];
    adj3 = [x, y, -z];

    return [adj1, adj2, adj3];
}



function getTriangularPrismAdjacentVertices(vertex){
    var adj1 = [], adj2 = [], adj3 = [];
    var x,y,z;
    x = vertex[0]; y = vertex[1]; z = vertex[2];

    //imagine the triangle |\
    //                     | \
    //                     |__\
    //adjacent vertices of a triangular prism
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

    return [adj1, adj2, adj3];
}


/**
 * finds all the Z positive and Z negative vertices of a Shape
 * @param nrOfTriangles
 * @param radius
 * @returns {[Array,Array]}
 */
function getShapeVertices(nrOfTriangles, radius, width){

    var pointsZPositive = [];
    var pointsZNegative = [];
    var rotationIncrement = - Math.PI/(nrOfTriangles/2);

    var currentRotation = 0;
    var i, x, y;
    var z = width/2;


    for (i = 0; i < nrOfTriangles; i++){
        x = Math.cos(currentRotation ) * radius;
        y = Math.sin(currentRotation) * radius;
        pointsZPositive.push([x, y, z]);
        pointsZNegative.push([x, y,-z]);

        currentRotation += rotationIncrement;
    }

    // add an extra so no index out of ranged is caused
    x = Math.cos(currentRotation ) * radius;
    y = Math.sin(currentRotation) * radius;
    pointsZPositive.push([x, y, z]);
    pointsZNegative.push([x, y,-z]);

    return [pointsZPositive, pointsZNegative];
}



/**
 * Given a list of vertices, it returns a new list that results of uniting all verticies with their adjacent in triangles
 * @param vertices
 * @returns {Array}
 */
function computeCuboidVertices(vertices){
    var i;
    var vertex;

    var triangles = [];

    for ( i = 0; i < vertices.length; i++){
        vertex = vertices[i];

        // only half of the vertices are needed to represent a cube
        if(!    ((hasSameSign(vertex[0], vertex[2])  && vertex[1] > 0) || // x sign = z sign and y > 0
                (!hasSameSign(vertex[0], vertex[2])) && vertex[1] < 0)) // x sign != z sign and y < 0
            continue;

        var adjacentVertices = getCuboidAdjacentVertices(vertex);
        adjacentVertices.push(adjacentVertices[0]); // avoid out of range situation; it loops back to first members

        addTrianglesToList(vertex, adjacentVertices, triangles);
    }
    return triangles;
}

/**
 * Particular version of computing triangles for a triangular prism
 * @param vertices
 * @returns {Array}
 */
function computeTriangularPrismVertices(vertices){
    var triangles = [];
    var vertex;
    var i;

    for ( i = 0; i < vertices.length; i++){
        vertex = vertices[i];
        var adjacentVertices = getTriangularPrismAdjacentVertices(vertex);

        if (vertex[0] < 0 && vertex[1]  > 0 && vertex[2] > 0 )
            var topLeftVertex = vertex;

        if (vertex[0] < 0 && vertex[1] < 0 && vertex [2] < 0 )
            var bottomRightBackVertex = vertex;

        if (vertex[0] > 0 && vertex[1] < 0 && vertex[2] < 0 )
            var bottomRightFrontVertex = vertex;

        if (vertex[0] > 0 && vertex[1] < 0 && vertex[2] > 0 )
            var bottomLeftFrontVertex = vertex;

        if (vertex[0] < 0 && vertex[1]  > 0 && vertex[2] < 0 ){
            var topRightVertex = vertex;
            addTrianglesToList(vertex, adjacentVertices, triangles);
        }
        if (vertex[0] < 0 && vertex[1] < 0 && vertex [2] > 0 ){
            var bottomLeftBackVertex = vertex;
            addTrianglesToList(vertex, adjacentVertices, triangles);
        }
    }
    //adds missing triangles
    addTrianglesToList(topLeftVertex, [bottomRightFrontVertex, bottomLeftFrontVertex], triangles);
    addTrianglesToList(bottomRightBackVertex, [bottomRightFrontVertex, bottomLeftFrontVertex], triangles);

    return triangles;
}


/**
 * computes the vertices for a 2d extruded shape
 * @param pointsZPositive
 * @param pointsZNegative
 * @param width
 * @param nrOfTriangles
 * @returns {Array}
 */
function computeShapeVertices (pointsZPositive, pointsZNegative, width, nrOfTriangles){

    var triangles = [];
    var adjacentVertices = [];

    var z = width/2;
    var centerPointPositive = [0, 0, z];
    var centerPointNegative = [0, 0, -z];
    var i;

    for( i = 0; i < nrOfTriangles ; i++){
        adjacentVertices = [pointsZNegative[i], pointsZPositive[i+1]]; // connects half border between positive and negative
        addTrianglesToList(pointsZPositive[i], adjacentVertices, triangles);

        adjacentVertices = [pointsZPositive[i+1] ,centerPointPositive]; // connects to center the positive side
        addTrianglesToList(pointsZPositive[i], adjacentVertices, triangles);


        adjacentVertices = [pointsZPositive[i+1], pointsZNegative[i+1]]; // the other half border between positive and negative
        addTrianglesToList(pointsZNegative[i], adjacentVertices, triangles);


        adjacentVertices = [pointsZNegative[i+1] ,centerPointNegative]; //connects to center the negative side
        addTrianglesToList(pointsZNegative[i], adjacentVertices, triangles);
    }
    return triangles;
}



/**
 *
 * @param vertex
 * @param adjacentVertices
 * @param triangles
 */
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
 * unites, adds and computes normals of vertices for given geometry
 * @param vertices
 * @param geometry
 */
function addVerticesToGeometry(vertices, geometry){
    var pos = 0;
    var i;

    for( i = 0; i < vertices.length; i+=3){
        var v1 = new THREE.Vector3(vertices[i][0],vertices[i][1],vertices[i][2]);
        var v2 = new THREE.Vector3(vertices[i+1][0],vertices[i+1][1],vertices[i+1][2]);
        var v3 = new THREE.Vector3(vertices[i+2][0],vertices[i+2][1],vertices[i+2][2]);

        geometry.vertices.push(v1);
        geometry.vertices.push(v2);
        geometry.vertices.push(v3);
        geometry.faces.push( new THREE.Face3( pos++, pos++, pos++ ));
    }
    geometry.computeFaceNormals();
}




//Vecor/Array aux functions
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

/**
 * finds if both numbers have same sign
 * @param element1
 * @param element2
 * @returns {boolean}
 */
function hasSameSign(element1, element2){
    return (element1 > 0 && element2 > 0) || (element1 < 0 && element2 < 0)
}


















// Extra content which is no longer used



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


