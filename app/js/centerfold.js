// centerfold.js returns an array with the index locations of supposed centerfolds

const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const strain = require('./strain.js');

// Returns with an array of indices for double page images for core array of image files
exports.fold = (id) => {
  id = document.getElementById(id);

  // global variables
  let dimensions, dirContents, fileDir, filePath, height, spread, width;

  // function variables
  let sortNumber;

  filePath = decodeURIComponent(id.src.substr(7));
  if (process.platform === 'win32') {
    filePath = decodeURIComponent(id.src.substr(8));
  }
  fileDir = path.dirname(filePath);
  dirContents = strain(fs.readdirSync(fileDir));
  spread = [];

  for (let i = 0; i < dirContents.length; i++) {
    dimensions = sizeOf(path.join(fileDir, dirContents[i]));
    width = dimensions.width;
    height = dimensions.height;

    if (width >= height) {
      spread.push(i);
    }
  }
  sortNumber = (a, b) => {
    return a - b;
  };
  return spread.sort(sortNumber);
};
