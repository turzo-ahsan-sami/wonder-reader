// strain.js cleans out the dirty files, like .DS_Store

const path = require('path');
const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

// Cleans out non image files from ARRAY
module.exports = (ARRAY) => {
  ARRAY = ARRAY.filter(function (x, i) {
    return imgTypes.indexOf(path.extname(ARRAY[i]).toLowerCase()) > -1;
  });
  ARRAY = ARRAY.sort();
  return ARRAY;
};
