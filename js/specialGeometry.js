




function createCuboidBufferMesh(height, depth, length){

    var vertices = getCuboidVertices(height, depth, length);

    var triangles = generateCuboidPointsArray(vertices);

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

function generateCuboidPointsArray(vertices){
    var position = 0;
    var adj1, adj2, adj3;
    var i, j, x, y, z;
    var vertex;

    // a cuboid has 8 vertices, each vertice will have 3 triangles, each triangle needs 3 vector, each vectors has 3 values
    // 8 vertices * 3 Triangles * 3 Vectors * 3 Points;
    var triangles = new Float32Array(3 * 3 * 3 * 8);


    for ( i = 0; i < vertices.length; i++){
        vertex = vertices[i];
        x = vertex[0]; y = vertex[1]; z = vertex[2];

        adj1 = [-x, y, z];
        adj2 = [x, -y, z];
        adj3 = [x, y, -z];

        // so when it would get out of range it goes back to the first member
        var adjacentVertices = [adj1, adj2, adj3, adj1];

        // creates a triangle for each point with his adjacent points
        for( j = 0; j < adjacentVertices.length-1 ; j++){
            position = addVectorPointsToList(vertex, position,triangles );
            position = addVectorPointsToList(adjacentVertices[j], position, triangles );
            position = addVectorPointsToList(adjacentVertices[j+1], position, triangles );
        }
    }
    return triangles;
}
