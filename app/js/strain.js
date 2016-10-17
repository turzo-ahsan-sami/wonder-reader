// strain.js cleans out the dirty files, like .DS_Store

var path = require('path');
var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

module.exports = function(array) {
  array = array.filter(function(x, i) {
    return imgTypes.indexOf(path.extname(array[i]).toLowerCase()) > -1
  });
  array = array.sort();
  return array;
};
