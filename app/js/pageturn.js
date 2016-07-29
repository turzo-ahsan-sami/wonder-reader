var path = require('path');
var fs = require('fs');

function pageRight() {
  var filePath = decodeURI(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath)
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);

  if ((index + 2) < dirArray.length) {
    // If page number + 2 is less than the total number of pages, then it turns the page 'right'
    index = index + 2;
    console.log('x = ' + index + ': line 16');
  } else if ((index + 2) >= dirArray.length) {
    // If page number + 2 is greater or equal to the total number of pages, then it stops on the last page
    index = dirArray.length;
    console.log('x = ' + index + ': line 19');
  };
  document.getElementById("viewImgOne").src = path.join(fileDir, dirArray[index]); // Loads array[x] into window
  document.getElementById("viewImgTwo").src = path.join(fileDir, dirArray[index + 1]); // Loads array[x + 1] into window
};

function pageLeft() {
  var filePath = decodeURI(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath)
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);

  if ((index - 2) > 0) {
    // If page number - 2 is greater than 0, ie the first page/cover, then it turns the page 'left'
    index = index - 2;
    console.log('x = ' + index + ': line 43');
  } else if ((index - 2) <= 0) {
    // If page number - 2 is less or equal to 0, ie the first page/cover, then it stops on the first page/cover
    index = 0;
    console.log('x = ' + index + ': line 46');
  };
  document.getElementById("viewImgOne").src = path.join(fileDir, dirArray[index]); // Loads array[x] into window
  document.getElementById("viewImgTwo").src = path.join(fileDir, dirArray[index + 1]); // Loads array[x + 1] into window
};

// KeyCode Variables
var leftKey = 37;
var rightKey = 39;

$(document).keydown(function(event) {
  if (event.which == leftKey) {
    pageLeft();
  } else if (event.which == rightKey) {
    pageRight();
  };
});
