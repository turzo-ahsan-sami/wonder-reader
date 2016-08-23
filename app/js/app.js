var fs = require('fs'); // https://nodejs.org/api/fs.html#fs_file_system
const $ = require('jquery'); // https://www.npmjs.com/package/jquery
var path = require('path'); // https://nodejs.org/api/path.html
var clean = require('./js/clean.js'); // Trash that old shit!
var page = require('./js/page.js'); // Page turning
var file = require('./js/file.js'); // File loading module

// file.dialog();
// file.loader(fileName, err);


var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

function enable(id) {
  document.getElementById(id).disabled = false;
};
function disable(id) {
  document.getElementById(id).disabled = true;
};

$(document).keydown(function(event) {
  if (document.activeElement.id == 'zoomText' || document.activeElement.id == 'zoomSlider') {
    // Do nothing when focused on zoom input
  } else {
    if (event.which == 37) { // left key
      page.Left();
    } else if (event.which == 39) { // right key
      page.Right();
    };
  };
});

function handleError(evt) {
  if (evt.message) { // Chrome sometimes provides this
    alert("Error: "+evt.message +"  at linenumber: "+evt.lineno+" of file: "+evt.filename);
  } else {
    alert("Error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
  }
};
window.addEventListener("error", handleError, true);

// On Load
document.getElementById('dirLib').style.height = window.innerHeight - 56 + 'px';
document.getElementById('viewer').style.height = window.innerHeight - 56 + 'px';

// On Changes
window.onresize = function() {
  document.getElementById('dirLib').style.height = window.innerHeight - 56 + 'px';
  document.getElementById('viewer').style.height = window.innerHeight - 56 + 'px';
};

function pageZoom() {
  var outer = document.getElementById('viewer');
  var inner = document.getElementById('innerWindow');
  var zoomSlide = document.getElementById('zoomSlider');
  var imgOne = document.getElementById('viewImgOne');
  var imgTwo = document.getElementById('viewImgTwo');
  console.log(inner.clientHeight)

  // Center Points
  var cPX = outer.scrollTop + outer.clientHeight/2;
  var cPY = outer.scrollLeft + outer.clientWidth/2;

  // Position Ratios to whole
  var cPXR = cPX/inner.clientHeight;
  var cPYR = cPY/inner.clientWidth;

  inner.style.width = zoomSlide.value + "%";
  if(imgOne.clientHeight >= imgTwo.clientHeight) {
    inner.style.height = imgOne.clientHeight + "px";
  } else {
    inner.style.height = imgTwo.clientHeight + "px";
  };
  outer.scrollTop = inner.clientHeight*cPXR - outer.clientHeight/2;
  outer.scrollLeft = inner.clientWidth*cPYR - outer.clientWidth/2;
};

function libSlider() {
  $('#library').toggleClass('shift-left');
  // $('.header h1').toggleClass('shift-left');
};

$('.header').mouseenter( function() {
  $('#viewer').removeClass('dragscroll');
}).mouseleave( function() {
  $('#viewer').addClass('dragscroll');
})
