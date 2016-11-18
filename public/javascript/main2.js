/**
 * Created by SpencerFricke on 11/2/2016.
 */

var isMobile = true;
var currentMode;

var renderer, lastRender, scene, camera, controls, effect, manager, loader;
var raycaster, center, mouse;

var cameraDolly;

var requestID;

function init() {

    // Setup three.js WebGL renderer
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Append the canvas element created by the renderer to document body element.
    document.body.appendChild(renderer.domElement);

    renderer.context.canvas.addEventListener("webglcontextlost", function(event) {
        var refreshSite = window.location.href.substring(0,window.location.href.indexOf("=") + 1) + currentSkybox;
        alert("Your browser hit its max for loading images, please refresh page: " + refreshSite);         
    }, false);

    // Create a three.js scene.
    scene = new THREE.Scene();

    // Create a three.js camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    // Apply VR headset positional data to camera.
    controls = new THREE.VRControls(camera);
    controls.standing = false; //default at 1.6 for height if standing but rather have it in center

    // Apply VR stereo rendering to renderer.
    effect = new THREE.VREffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);


    /*// This helps move the camera because the camera is updated via the VRControls
    // There is no public method to move the rotation needed when setting the starting point of each room
    cameraDolly = new THREE.Group();
    scene.add( cameraDolly  );
    cameraDolly.add( camera );*/

    // Create a VR manager helper to enter and exit VR mode.
    var params = {
        hideButton: false, // Default: false.
        isUndistorted: false // Default: false.
    };
    manager = new WebVRManager(renderer, effect, params);

    //saves mode when changes - 3 is VR
    manager.on('modechange', function(isNow, wasThen){
       currentMode = isNow;
    });

    //needs to render one frame first, better off initializing the logic then checking it each frame
    window.setTimeout(function(){       
       if (manager.hmd.displayName == "Mouse and Keyboard VRDisplay (webvr-polyfill)") {
           isMobile = false;
       }
    },250);
    
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

   /* //main RayCaster
    raycaster = new THREE.Raycaster();
    center = new THREE.Vector2();
    mouse = new THREE.Vector2();*/
    
//    requestID = requestAnimationFrame(animate);
    requestAnimationFrame(animate);


}

// Request animation frame loop function

function animate(timestamp) {

    
    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;

  /*  //gets the raycasting
    //mouse if not mobile, center if mobile
    if (isMobile) { 
        raycaster.setFromCamera(center, camera);
    } else {
        raycaster.setFromCamera(mouse, camera);
    }
    intersection = raycaster.intersectObjects( movePanels );

    //checks for an intersection
    if (intersection.length > 0) {
        //checks if different intersection
        if ( intersected !== intersection[0].object ) {

            //switched intersection, need to turn off old one
            if ( intersected ) {
                intersected.material.visible = false;
            }
            intersected = intersection[ 0 ].object;
            intersected.material.visible = true;
        }
    //if there was an intersected but now nothing being raycasted
    } else if ( intersected ) {
        intersected.material.visible = false;
        intersected = null;
    }
*/
    // Update VR headset position and apply to camera.
    controls.update();

    // Render the scene through the manager.
    manager.render(scene, camera, timestamp);

    requestAnimationFrame(animate);
}

var display;

// Get the HMD, and if we're dealing with something that specifies
// stageParameters, rearrange the scene.
function setupStage() {
    navigator.getVRDisplays().then(function(displays) {
        if (displays.length > 0) {
            display = displays[0];
            if (display.stageParameters) {
                setStageDimensions(display.stageParameters);
            }
        }
    });
}


window.onload = init;


