/**
 * Geometria: Construye una geometria THREEJS y la retorna
 * ENTRADAS: vx = Arreglo de vertices (arreglo de arreglos)
 * SALIDAS: geom = Geometria generada a partir de vx
 */
function Geometria(vx){
    geom=new THREE.Geometry();
    var largoVertice = vx.length;
    for (i = 0; i < largoVertice; i++) {
        [x, y, z] = [vx[i][0], vx[i][1], vx[i][2]];
        vector = new THREE.Vector3(x, y, z);
        geom.vertices.push(vector);
    }
    return geom;
}

/**
 * Traslacion: Construye la matriz de traslacion de THREEJSpara el vector vt y la retorna 
 * ENTRADAS: vt = Vector de traslacion (arreglo de enteros)
 * SALIDAS: matrizT = Matriz de traslacion para el vector vt
 */
function Traslacion(vt){
    var matrizT =new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
                0, 1, 0, vt[1],
                0, 0, 1, vt[2],
                0, 0, 0, 1);
    return matrizT
}
/**
 * Escalado: Construye la matriz de escalado de THREEJSpara el vector vt y la retorna 
 * ENTRADAS: vs = Vector de escalado (arreglo de enteros)
 * SALIDAS: matrizT = Matriz de escalado para el vector vs
 */
function Escalado(vs){
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
                0, vs[1], 0, 0,
                0, 0, vs[2], 0,
                0, 0, 0, 1);
            return matrizS;
}

/**
 * EscaladoReal:  Aplica el vector de escalado vs al objeto fig
 * ENTRADAS: fig  =  Objeto tipo THREE.Line que presenta la figura 
 *           vs = Vector de escalado (arreglo de enteros)
 *           posini = posicion inicial del fig (array de enteros)
 * SALIDAS: 
 */
function EscaladoReal(fig, posini, vs){
    tr = [-posini[0],-posini[1],-posini[2]];    // vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));
    fig.applyMatrix(Escalado(vs));
    fig.applyMatrix(Traslacion(posini));
      
}

function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //C??mara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 400;
    camera.lookAt(scene.position);

    // Creaci??n de las Figuras
    // Geometria de la piramide 
    lado = 30; //lado de la piramide
    h = 45;    // altura de la piramide
    [v1, v2, v3, v4, v5] = [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    var vertices= [ v1,v2,v3,v4,v5, v1,v4,v3,v5,v2];
    geoPiramide = Geometria(vertices);

    // Colores para las piramides
    color=[{color:0x00ff00},{color:0xFF0000}];

    // Material para las piramides
    material= [];
    for(i=0;i<2;i++)
        material.push=  new THREE.ParticleBasicMaterial(color[i]);
    
   
    // Figuras para las piramides
    piramide= [];
    for(i=0;i<2;i++)
        piramide.push(new THREE.Line(geoPiramide, material[i]));
       

    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    for(i=0;i<2;i++)
        scene.add(piramide[i]);
       
    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;
