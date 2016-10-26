// centerfold.js returns an array with the index locations of supposed centerfolds

const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const strain = require('./strain.js');

exports.fold = (id) => {
  let filePath = decodeURIComponent(document.getElementById(id).src.substr(7));
  if (process.platform == "win32") {
    filePath = decodeURIComponent(document.getElementById(id).src.substr(8));
  }
  let fileDir = path.dirname(filePath);
  let dirContents = strain(fs.readdirSync(fileDir));
  let spread = [];

  for (let i = 0; i < dirContents.length; i++) {
    (function(i) {
      let dimensions = sizeOf(path.join(fileDir, dirContents[i]));
      let width = dimensions.width;
      let height = dimensions.height;

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
