var pathfinder = require('./js/pathfinder')

// KeyCode Variables
var leftKey = 37;
var rightKey = 39;

function pageRight() {
  var x = pathfinder('viewImgOne').indexVar;
  var dirContents = pathfinder('viewImgOne').pathArray;

  if ((x + 2) < dirContents.length) {
    x = x + 2;
    console.log('x = ' + x + ': line 4');
  } else if ((x + 2) <= dirContents.length){
    x = array.length
    console.log('x = ' + x + ': line 7');
  };
  document.getElementById("viewImgOne").src = 'cache/' + dirContents[x];   // Loads array[x] into window
  document.getElementById("viewImgTwo").src = 'cache/' + dirContents[x+1]; // Loads array[x + 1] into window
};
function pageLeft() {
  var x = pathfinder('viewImgOne').indexVar;
  var dirContents = pathfinder('viewImgOne').pathArray;

  if ((x - 2) > 0) {
    x = x - 2;
    console.log('x = ' + x + ': line 43');
  } else if ((x - 2) < 0 ) {
    x = 0;
    console.log('x = ' + x + ': line 46');
  };
  document.getElementById("viewImgOne").src = 'cache/' + dirContents[x];    // Loads array[x] into window
  document.getElementById("viewImgTwo").src = 'cache/' + dirContents[x+1];  // Loads array[x + 1] into window
};
