

function createTriangularPrismBufferMesh(depth, height, length){

    var i;

    var vertices = getCuboidVertices(height, depth, length);

    var vertexToRemove1 = [depth/2, height/2, length/2];
    var vertexToRemove2 = [depth/2, height/2, -length/2];

    for ( i = 0; i < vertices.length; i++)
        if (equalArrays(vertices[i], vertexToRemove1))
            vertices.splice(i,1);

    for ( i = 0; i < vertices.length; i++)
        if (equalArrays(vertices[i],vertexToRemove2))
            vertices.splice(i,1);

    var triangles = generateGeometryPointsArray(vertices, 6);

    var geometry = new THREE.BufferGeometry();

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute( 'position', new THREE.BufferAttribute( triangles, 3 ) );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var mesh = new THREE.Mesh( geometry, material );

    //centralize for squared triangles
    mesh.translateX(depth/4);
    mesh.translateY(height/8);

    return mesh;
}


function createCuboidBufferMesh(depth, height, length){

    var vertices = getCuboidVertices(height, depth, length);

    var triangles = generateGeometryPointsArray(vertices, 8);

    var geometry = new THREE.BufferGeometry();

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute( 'position', new THREE.BufferAttribute( triangles, 3 ) );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var mesh = new THREE.Mesh( geometry, material );

    return mesh;
}



function addVectorPointsToList(vector, position, list){
    for( var i = 0; i < vector.length; i++)
        list[position++] = vector[i];
    return position;
}

function getCuboidVertices (height, depth, length){
    var i,j,k;
    var temp_height, temp_depth, temp_length;
    var vertices = [];

    var h  = height/2;
    var d = depth/2;
    var l = length/2;

    // calculates all 8 points of a cuboid
    for(i = 0; i <2; i++){
        for(j = 0; j < 2; j++){
            for( k = 0; k < 2; k++){
                // changes de values for each iteration
                temp_length = k === 0 ? l : -l;
                temp_height = j === 0 ? h : -h;
                temp_depth  = i === 0 ? d : -d;
                vertices.push([temp_depth, temp_height, temp_length]);
            }
        }
    }
    return vertices;
}


function getAdjacentVertices( vertex, numberOfObjectVertices){
    var adj1, adj2, adj3;
    var x,y,z;
    x = vertex[0]; y = vertex[1]; z = vertex[2];


    if(numberOfObjectVertices === 8){
        adj1 = [-x, y, z];
        adj2 = [x, -y, z];
        adj3 = [x, y, -z];
    }

    if(numberOfObjectVertices === 6){
        if((y > 0 && x < 0)  ){
            adj1 = [-x, -y, z];
            adj2 = [x, -y, z];
            adj3 = [x, y, -z];
        }
        else{
            if ((y < 0 && x > 0)){
                adj1 = [-x, -y, z];
                adj2 = [-x, y, z];
                adj3 = [x, y, -z];
            }else{
                adj1 = [-x, y, z];
                adj2 = [x, -y, z];
                adj3 = [x, y, -z];
            }
        }
    }

    return [adj1, adj2, adj3];
}

function generateGeometryPointsArray(vertices, numberOfObjectVertices){
    var position = 0;
    var i, j;
    var vertex;

    // has X vertices, each vertice will have 3 triangles, each triangle needs 3 vector, each vectors has 3 values
    // X vertices * 3 Triangles * 3 Vectors * 3 Points;
    var triangles = new Float32Array(3 * 3 * 3 * numberOfObjectVertices);

    for ( i = 0; i < vertices.length; i++){
        vertex = vertices[i];
        var adjacentVertices = getAdjacentVertices(vertex, numberOfObjectVertices);

        // so when it would get out of range it goes back to the first member
        adjacentVertices.push(adjacentVertices[0]);

        // creates a triangle for each point with his adjacent points
        for( j = 0; j < adjacentVertices.length-1 ; j++){
            position = addVectorPointsToList(vertex, position,triangles );
            position = addVectorPointsToList(adjacentVertices[j], position, triangles );
            position = addVectorPointsToList(adjacentVertices[j+1], position, triangles );
        }
    }
    return triangles;
}





function equalArrays(array1, array2){
    if(array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++)
        if (array1[i] !== array2[i])
            return false;
    return true;
}

