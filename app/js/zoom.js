var viewWindow = document.getElementById('view-window');
var zoomLimit = document.getElementById('zoomlimit');
var viewHeight = parseInt(document.getElementById('view-window').style.height);
var viewWidth = parseInt(document.getElementById('view-window').style.width);
  // var vertMargin = parseInt(document.getElementById('view-window').style.marginTop)
function limiter() {

  var zoomValue = zoomLimit.value;
  // Limits zoom paramaters to 25% to 200%
  if (zoomValue >= 200) {
    zoomLimit.value = 200;
  } else if (zoomValue < 25) {
    zoomLimit.value = 25;
  } else {
    // do nothiing
  };

  // Inputs numbers into application
  var newHeight = zoomLimit.value * 0.01 * viewHeight;
  var newWidth = zoomLimit.value * 0.01 * viewWidth;
  viewWindow.style.height = newHeight;
  viewWindow.style.marginTop = newHeight * -0.5 + 20;
  viewWindow.style.width = newWidth;
  viewWindow.style.marginLeft = newWidth * -0.5;
};

/* Disables all a tags */
window.onload = function () {
  var anchors = document.getElementsByTagName("a");
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].onclick = function () {
      return (false)
    }
  }
}
