// centerfold.js returns an array with the index locations of supposed centerfolds
const path = require('path');
const sizeOf = require('image-size');

// Returns with an array of indices for double page images for core array of image files
exports.fold = (filePath, extractedImages) => {
  // variables
  let dimensions,
    spread = [];

  // function variables
  let sortNumber = (a, b) => {
    return a - b;
  };

  for (let i = 0; i < extractedImages.length; i++) {
    dimensions = sizeOf(path.join(filePath, extractedImages[i]));
    if (dimensions.width >= dimensions.height)
      spread.push(i);
  }
  return spread.sort(sortNumber);
};
