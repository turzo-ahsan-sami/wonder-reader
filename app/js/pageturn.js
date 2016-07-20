// KeyCode Variables
var leftKey = 37;
var rightKey = 39;

function pathFinder(imgID) { // finds the Array value of current loaded comic page
  var pathSource = document.getElementById(imgID).src; // returns file:// + $PATH: Figure that shit out, Alice!
  console.log(pathSource + " at line 7, pageTurn.js");
  var fileName = pathSource.replace(/^.*[\\\/]/, '');
  console.log(fileName + " at line 9, pageTurn.js");
  var r = /[^\/]*$/;
  var pathDir = pathSource.replace(r, '');
  console.log(pathDir + " at line 7, pageTurn.js");
  console.log('Line 13:' + fs.readdirSync(pathDir))
  var readPathDir = fs.readdirSync(pathDir);
  // for(var i=0; i = readPathDir.length - 1; i++) {
  //   (function(i){
  //     if (fileName == readPathDir[i]) {
  //       return i;
  //     };
  //   });
  // };
};



function pageRight() {
  if (/*event.keyCode = rightKey && */(x + 2) < dirContents.length) {
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
  if (/*event.keyCode = leftKey && */(x - 2) > 0) {
    x = x - 2;
    console.log('x = ' + x + ': line 43');
  } else if ((x - 2) < 0 ) {
    x = 0;
    console.log('x = ' + x + ': line 46');
  };
  document.getElementById("viewImgOne").src = 'cache/' + dirContents[x];    // Loads array[x] into window
  document.getElementById("viewImgTwo").src = 'cache/' + dirContents[x+1];  // Loads array[x + 1] into window
};
