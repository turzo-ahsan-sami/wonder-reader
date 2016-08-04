var fs = require('fs');
var path = require('path');

function enable(id) {
  document.getElementById(id).disabled = false;
};
function disable(id) {
  document.getElementById(id).disabled = true;
};

exports.load = (fileName) => {
  var baseName = path.basename(fileName);
  var filePath = path.dirname(fileName);
  var dirContents = fs.readdirSync(filePath);

  console.log(dirContents + 'line 9, nextcomic.js');

  var dirComics = dirContents.filter(function(x,i) { return fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i])) > -1});

  console.log(dirComics + 'line 15, nextcomic.js')

  var fileIndex = dirComics.indexOf(baseName); // Gets index position of file inside directory array

  console.log(fileName);
  console.log(baseName);
  console.log(fileIndex);



  if (fileIndex == 0) { // If loaded comic is first comic in directory

  } else if (fileIndex == dirContents.length -1) { // If loaded comic is the last comic in directory

  } else {

  }
};
