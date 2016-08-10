var path = require('path');
var fs = require('fs');

exports.pageRight = (val) => {

  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath);
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);

  if ((index + val) < dirArray.length) {
    // If page number + 2 is less than the total number of pages, then it turns the page 'right'
    index = index + val;
  } else if ((index + val) >= dirArray.length -1) {
    // If page number + 2 is greater or equal to the total number of pages, then it stops on the last page
    index = dirArray.length -1; // TODO: figure out this proper value
  };
  document.getElementById("viewImgOne").src = path.join(fileDir, encodeURIComponent(dirArray[index])); // Loads array[x] into window // TODO : Causes errors, maybe change to (dirArray.length -1)?
  document.getElementById("viewImgTwo").src = path.join(fileDir, encodeURIComponent(dirArray[index + 1])); // Loads array[x + 1] into window
};

exports.pageLeft = (val) => {
  var filePath = decodeURIComponent(document.getElementById('viewImgOne').src.substr(7)); // removes file:// from PATH
  var fileDir = path.dirname(filePath)
  var dirArray = fs.readdirSync(fileDir);
  var fileName = path.basename(filePath);
  var index = dirArray.indexOf(fileName);

  if ((index - val) > 0) {
    // If page number - 2 is greater than 0, ie the first page/cover, then it turns the page 'left'
    index = index - val;
  } else if ((index - val) <= 0) {
    // If page number - 2 is less or equal to 0, ie the first page/cover, then it stops on the first page/cover
    index = 0;
  };
  document.getElementById("viewImgOne").src = path.join(fileDir, encodeURIComponent(dirArray[index])); // Loads array[x] into window
  document.getElementById("viewImgTwo").src = path.join(fileDir, encodeURIComponent(dirArray[index + 1])); // Loads array[x + 1] into window
};
