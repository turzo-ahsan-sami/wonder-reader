// title.js: sets title to comic name

var path = require('path');

exports.load = (fileName) => {
  var file = path.basename(fileName, path.extname(fileName));
  document.title = 'Wonder Reader : ' + file;
}
