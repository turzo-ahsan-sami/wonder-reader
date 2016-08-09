var sizeOf = require('image-size'),
  path = require('path'),
  fs = require('fs');
var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

exports.fold = (id) => {
  var filePath = decodeURIComponent(document.getElementById(id).src.substr(7)), // removes file:// from PATH
    fileDir = path.dirname(filePath), // Directory
    dirContents = fs.readdirSync(fileDir), // Directory contents
    dirContents = dirContents.filter(function(x, i) {return imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1}), // Filters out non-image files types
    fileName = path.basename(filePath),
    spread = [];

  for (var i = 0; i < dirContents.length; i++) {
    (function(i) {
      var dimensions = sizeOf(path.join(fileDir, dirContents[i]));
      var width = dimensions.width;
      var height = dimensions.height;

      if (width >= height) {
        spread.push(i);
      } else {
        // Do Nothing!
      };
    })(i);
  };

  console.log("These are the indexes of centerfolds " + spread);
  return spread;
}
