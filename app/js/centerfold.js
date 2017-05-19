// centerfold.js returns an array with the index locations of supposed centerfolds

const decode = require('./decode.js');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const strain = require('./strain.js');

// Returns with an array of indices for double page images for core array of image files
exports.fold = (id) => {
  id = document.getElementById(id);

  // variables
  let dimensions, extractedImages, fileDirectory, filePath, height, spread, width;

  // function variables
  let sortNumber;

  filePath = decode(id);
  fileDirectory = path.dirname(filePath);
  extractedImages = strain(fs.readdirSync(fileDirectory));
  spread = [];

  for (let i = 0; i < extractedImages.length; i++) {
    dimensions = sizeOf(path.join(fileDirectory, extractedImages[i]));
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
