const debounce = require('debounce'); // https://www.npmjs.com/package/debounce
const config = require('./config.js');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const zoomEvent = new MyEmitter();

// Variables
const viewOne = document.getElementById('viewImgOne');
const viewTwo = document.getElementById('viewImgTwo');
const inner = document.getElementById('innerWindow');
const viewer = document.getElementById('viewer');
const zoomSlide = document.getElementById('zoomSlider');

// Function Variables
let autoResize, width, zoomTextUpdate;

// Syncs dial to output box
zoomTextUpdate = (val) => {
  document.getElementById('zoomText').value = val;
};

// Function that resizes innerWindow div
autoResize = () => {
  if (viewOne.clientHeight >= viewTwo.clientHeight) {
    inner.style.height = `${viewOne.clientHeight}px`;
  } else {
    inner.style.height = `${viewTwo.clientHeight}px`;
  }
};

width = () => {
  // Center Points X || Y
  let cPX = viewer.scrollTop + viewer.clientHeight / 2;
  let cPY = viewer.scrollLeft + viewer.clientWidth / 2;

  // Position Ratios to whole
  let cPXR = cPX / inner.clientHeight;
  let cPYR = cPY / inner.clientWidth;

  // Sets the width & margin for the viewer window
  inner.style.width = `${zoomSlide.value}%`;
  if (zoomSlide.value < 100) {
    inner.style.marginLeft = `${(100 - zoomSlide.value) / 2}%`;
  } else {
    inner.style.marginLeft = 0;
  }

  autoResize();

  // Sets Y margins as necessary
  if (viewer.clientHeight > inner.clientHeight) {
    inner.style.marginTop = `${(viewer.clientHeight - inner.clientHeight) / 2}px`;
  } else {
    inner.style.marginTop = 0;
  }

  // Scrolls towards defined centerpoint
  viewer.scrollTop = inner.clientHeight * cPXR - viewer.clientHeight / 2;
  viewer.scrollLeft = inner.clientWidth * cPYR - viewer.clientWidth / 2;

  // Update & Position Save Event Emitter (for debouncing)
  zoomTextUpdate(zoomSlide.value);
  zoomEvent.emit('save');
};

// Saves zoom levels with debounce
zoomEvent.on('save', function() {
  debounce(config.zoomSave(zoomSlide.value), 250);
});

exports.autoResize = () => {
  autoResize();
};

// Zoom on Start Up
exports.onStart = () => {
  let val = config.zoomReturn();
  zoomSlide.value = val;
  inner.style.width = `${val}%`;
  zoomTextUpdate(val);
  width();
};

exports.width = () => {
  width();
};
