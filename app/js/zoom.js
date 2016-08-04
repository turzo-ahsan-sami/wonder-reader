var viewer = document.getElementById('viewer'); // View Window
var zoomSlider = document.getElementById('zoomSlider'); // Zoom Slider
var zoomText = document.getElementById('zoomText'); // Zoom Text Input

var viewHeight = parseInt(viewer.style.height);
var viewWidth = parseInt(viewer.style.width);
  // var vertMargin = parseInt(document.getElementById('view-window').style.marginTop)
function slideToText() {

  var zoomValue = zoomSlider.value;
  // Limits zoom paramaters to 25% to 200%
  if (zoomValue >= 200) {
    zoomSlider.value = 200;
  } else if (zoomValue < 25) {
    zoomSlider.value = 25;
  } else {
    // do nothiing
  };

  // Inputs numbers into application
  var newHeight = zoomSlider.value * 0.01 * viewHeight;
  var newWidth = zoomSlider.value * 0.01 * viewWidth;
  viewer.style.height = newHeight;
  viewer.style.marginTop = newHeight * -0.5 + 20;
  viewer.style.width = newWidth;
  viewer.style.marginLeft = newWidth * -0.5;
};

/* Prototype value increaser */
// var c = 0
//
// function zoomAdder () {
//   var zoomValue = parseInt(document.getElementById('zoomlimit').value)
//   // console.log("++c + zoomValue is "++c + zoomValue);
//   document.getElementById("zoomlimit").value = zoomValue + ++c;
// };
