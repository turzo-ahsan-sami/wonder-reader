var sizeOf = require('image-size');
var path = require('path');
var fs = require('fs');
var strain = require('./strain.js')

exports.fold = (id) => {
  var filePath = decodeURIComponent(document.getElementById(id).src.substr(7));
  var fileDir = path.dirname(filePath); // Directory
  var dirContents = strain(fs.readdirSync(fileDir)) // Directory contents
  var spread = [];

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
  // There shouldn't be any duplicates;
  function sortNumber(a,b) { // To Sort numerically, just in case
    return a - b;
  };
  spread = spread.sort(sortNumber);
  return spread;
}
