/**
 * Created by SpencerFricke on 11/2/2016.
 */

//VR events
window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);
//click/touch events
window.addEventListener('mousedown', onClickEvent, true);
window.addEventListener('tap', onClickEvent, true);
window.addEventListener('touchstart', onClickEvent, true);

//use touch events to recognize pinching for zooming
//f0 and f1 are frame 0 and 1... the idea is you take frame1 - frame0 to get difference of pinch zoom
var f0pinch, f1pinch;
window.addEventListener('touchmove', function(event) {

//    //checks if 2 fingers are being used
//    if(event.touches.length >= 2) {
//        //use pythagorean theorem to get pinch distance and passes it to onPinchZoom
//        onPinchZoom(
//            Math.sqrt(
//                (event.touches[0].pageX-event.touches[1].pageX) * (event.touches[0].pageX-event.touches[1].pageX) +
//                (event.touches[0].pageY-event.touches[1].pageY) * (event.touches[0].pageY-event.touches[1].pageY)
//            )
//        );
//    }
}, true);
//when done pinching resets frame 0
window.addEventListener('touchend', function(event) { f0pinch = false; }, true);

function onPinchZoom(dist) {
//
//    if (f0pinch) {
//        camera.fov -= ( (dist - f0pinch) * 0.15);
//        f0pinch = dist;
//    } else {
//        //first frame, setting f0
//        f0pinch = dist;
//    }
//
//    //sets a zoom limit
//    camera.fov = Math.max(40, Math.min(100, camera.fov));
//    camera.updateProjectionMatrix();
}


function onClickEvent(event){
    
}

function onResize(e) {
    effect.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

var vrDisplay;
// Get the HMD, and if we're dealing with something that specifies
// stageParameters, rearrange the scene.
function setupStage() {
  navigator.getVRDisplays().then(function(displays) {
    if (displays.length > 0) {
      vrDisplay = displays[0];
      if (vrDisplay.stageParameters) {
        alert("HMD not supported yet - Sorry!")
//        setStageDimensions(vrDisplay.stageParameters);
      }
      vrDisplay.requestAnimationFrame(animate);
    }
  });
}