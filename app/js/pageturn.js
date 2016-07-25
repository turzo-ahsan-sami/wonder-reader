// KeyCode Variables
var leftKey = 37;
var rightKey = 39;

function pathFinder(imgID) { // finds the Array value of current loaded comic page
  var pathSource = document.getElementById(imgID).src.substr(7); // returns file:// + $PATH
  console.log(pathSource + " at line 7, pageturn.js");
  var fileNom = pathSource.replace(/^.*[\\\/]/, '').replace(/%20/, ' '); // Returns file name without directory path
  console.log(fileNom + " at line 9, pageturn.js");
  var r = /[^\/]*$/;
  var pathDir = pathSource.replace(r, ''); // Returns directory path
  console.log(pathDir + " at line 12, pageturn.js");
  console.log(fs.readdirSync(pathDir) + " at line 13, pageturn.js")
  var readPathDir = fs.readdirSync(pathDir);
  var indexVar = readPathDir.indexOf(fileNom);
  return indexVar;
};

function pageRight() {
  var x = pathFinder('viewImgOne');
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
  var x = pathFinder('viewImgOne');
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
