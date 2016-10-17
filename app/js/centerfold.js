// centerfold.js returns an array with the index locations of supposed centerfolds

var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var strain = require('./strain.js');

exports.fold = (id) => {
  var filePath = decodeURIComponent(document.getElementById(id).src.substr(7));
  if (process.platform == "win32") {
    filePath = decodeURIComponent(document.getElementById(id).src.substr(8));
  }
  var fileDir = path.dirname(filePath);
  var dirContents = strain(fs.readdirSync(fileDir));
  var spread = [];

  for (var i = 0; i < dirContents.length; i++) {
    (function(i) {
      var dimensions = sizeOf(path.join(fileDir, dirContents[i]));
      var width = dimensions.width;
      var height = dimensions.height;

      if (width >= height) {
        spread.push(i);
      }
    })(i);
  };
  function sortNumber(a,b) {
    return a - b;
  };
  spread = spread.sort(sortNumber);
  return spread;
};
