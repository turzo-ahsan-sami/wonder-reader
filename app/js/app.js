const $ = require('jquery'); // https://www.npmjs.com/package/jquery
var clean = require('./js/clean.js');
var file = require('./js/file.js');
var library = require('./js/library.js');
var page = require('./js/page.js');

$(document).keydown(function(event) {
  if (document.activeElement.id == 'zoomText' || document.activeElement.id == 'zoomSlider') {
    // Do nothing when focused on zoom input
  } else if ( $('#viewer').hasClass('active') ) {
    // Check if file is loaded. See file.js: postExtract()
    if (event.which == 37) { // left key
      page.Left();
    } else if (event.which == 39) { // right key
      page.Right();
    };
  };
});

function handleError(evt) {
  if (evt.message) {
    alert("Error: "+evt.message +"  at linenumber: "+evt.lineno+" of file: "+evt.filename);
  } else {
    alert("Error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
  }
};
window.addEventListener("error", handleError, true);

// On Load
document.getElementById('dirLib').style.height = window.innerHeight - 56 + 'px';
document.getElementById('viewer').style.height = window.innerHeight - 56 + 'px';
document.getElementById('bgLoader').style.left = window.innerWidth/2 - 75 + 'px';
document.getElementById('bgLoader').style.top = window.innerHeight/2 - 75 + 'px';
document.getElementById('loader').style.left = window.innerWidth/2 - 75 + 'px';
document.getElementById('loader').style.top = window.innerHeight/2 - 75 + 'px';
document.getElementById('innerWindow').style.top = window.innerHeight - 56 + 'px';

// On Changes
window.onresize = function() {
  var inner = document.getElementById('innerWindow');
  var imgOne = document.getElementById('viewImgOne');
  var imgTwo = document.getElementById('viewImgTwo');
  document.getElementById('dirLib').style.height = window.innerHeight - 56 + 'px';
  document.getElementById('viewer').style.height = window.innerHeight - 56 + 'px';
  document.getElementById('bgLoader').style.left = window.innerWidth/2 - 75 + 'px';
  document.getElementById('bgLoader').style.top = window.innerHeight/2 - 75 + 'px';
  document.getElementById('loader').style.left = window.innerWidth/2 - 75 + 'px';
  document.getElementById('loader').style.top = window.innerHeight/2 - 75 + 'px';
  if(imgOne.clientHeight >= imgTwo.clientHeight) {
    inner.style.height = imgOne.clientHeight + "px";
  } else {
    inner.style.height = imgTwo.clientHeight + "px";
  };
};

function pageZoom() {
  var outer = document.getElementById('viewer');
  var inner = document.getElementById('innerWindow');
  var zoomSlide = document.getElementById('zoomSlider');
  var imgOne = document.getElementById('viewImgOne');
  var imgTwo = document.getElementById('viewImgTwo');

  // Center Points
  var cPX = outer.scrollTop + outer.clientHeight/2;
  var cPY = outer.scrollLeft + outer.clientWidth/2;

  // Position Ratios to whole
  var cPXR = cPX/inner.clientHeight;
  var cPYR = cPY/inner.clientWidth;

  inner.style.width = zoomSlide.value + "%";
  if (zoomSlide.value < 100) {
    inner.style.marginLeft = (100 - zoomSlide.value)/2 + "%";
  } else {
    inner.style.marginLeft = 0;
  };
  if(imgOne.clientHeight >= imgTwo.clientHeight) {
    inner.style.height = imgOne.clientHeight + "px";
  } else {
    inner.style.height = imgTwo.clientHeight + "px";
  };
  if (outer.clientHeight > inner.clientHeight) {
    inner.style.marginTop = (outer.clientHeight - inner.clientHeight)/2 + 'px';
  } else {
    inner.style.marginTop = 0;
  }
  outer.scrollTop = inner.clientHeight*cPXR - outer.clientHeight/2;
  outer.scrollLeft = inner.clientWidth*cPYR - outer.clientWidth/2;
};

function libSlider() {
  $('#sideLib').toggleClass('shift-left');
};

// dragscroll things
$('#zoomSlider').mouseenter( function() {
  $('#viewer').removeClass('dragscroll');
  $('#zoomSlider').focus();
}).mouseleave( function() {
  $('#viewer').addClass('dragscroll');
  $('#zoomSlider').blur();
});
