// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
controls.standing = false; //adds 1.6 to height if set true

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

//Add some light
scene.add( new THREE.AmbientLight( 0xcccccc ) );

// Add a repeating grid as a skybox.
var SphereRadius = 100;
var gridLoader = new THREE.TextureLoader();
gridLoader.load('img/WhiteBox.png', function(texture) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipMapNearestFilter;
  texture.repeat.set(32,16);
  var geometry = new THREE.SphereGeometry(SphereRadius, 32, 32);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  });
  // Align the skybox to the floor (which is at y=0).
  skybox = new THREE.Mesh(geometry, material);
  scene.add(skybox);
  // For high end VR devices like Vive and Oculus, take into account the stage
  // parameters provided.
  setupStage();
});

// parent pivot point
parentPivot = new THREE.Object3D();
scene.add( parentPivot );

// pivots
var pivotCar = new THREE.Object3D();
var pivotPlane = new THREE.Object3D();
pivotCar.rotation.z = 0;
pivotPlane.rotation.z = 0;
parentPivot.add( pivotCar );
parentPivot.add( pivotPlane );

//creates objects and loads them into scene

var car_mtlLoader = new THREE.MTLLoader();
    car_mtlLoader.load( 'models/car.mtl', function( materials ) {
        materials.preload();
        var car_objLoader = new THREE.OBJLoader();
        car_objLoader.setMaterials( materials );
        car_objLoader.load( 'models/car.obj', function ( object ) {
            object.scale.set(.1,.1,.1);
            object.name = "car";
            object.position.set(0,0,-2);
            pivotCar.add( object );
        });
    });

var plane_mtlLoader = new THREE.MTLLoader();
    plane_mtlLoader.load( 'models/plane.mtl', function( materials ) {
        materials.preload();
        var plane_objLoader = new THREE.OBJLoader();
        plane_objLoader.setMaterials( materials );
        plane_objLoader.load( 'models/plane.obj', function ( object ) {
            object.scale.set(.1,.1,.1);
            object.name = "plane";
            object.position.set(0,0,-2);
            pivotPlane.add( object );
        });
    });






// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);



// Request animation frame loop function
var lastRender = 0;
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;
  controls.update();
  
  pivotCar.rotation.y += .002;  
  pivotPlane.rotation.y += .005;  
    
  // Render the scene through the manager.
  manager.render(scene, camera, timestamp);
  effect.render(scene, camera);
  vrDisplay.requestAnimationFrame(animate);
}


// White area light, intensity = 1, 
                    //PointLight( color,    intensity, distance, decay )
var light = new THREE.PointLight( 0xff0000,     1,       100,      1   );
light.position.set( 50, 50, 50 ); // Light source coordinates
scene.add( light );




