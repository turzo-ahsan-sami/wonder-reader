var fs = require('fs');
var path = require('path');
var file = require('./file.js')

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

  var dirComics = dirContents.filter(function(x,i) { return fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i]).toLowerCase()) > -1});

  var fileIndex = dirComics.indexOf(baseName); // Gets index position of file inside directory array

  var nextComic = document.getElementById('nextComic');
  var prevComic = document.getElementById('prevComic');

  if (fileIndex <= 0) { // If loaded comic is first comic in directory
    var nextSrc = path.join(filePath, dirComics[fileIndex + 1]);
    nextComic.onclick=function() {file.loader(nextSrc)};
    enable('nextComic')
  } else if (fileIndex >= dirComics.length -1) { // If loaded comic is the last comic in directory
    var prevSrc = path.join(filePath, dirComics[fileIndex - 1]);
    prevComic.onclick=function() {file.loader(prevSrc)};
    enable('prevComic')
  } else { // If comic is somewhere in the middle of the directory array
    var nextSrc = path.join(filePath, dirComics[fileIndex + 1]);
    var prevSrc = path.join(filePath, dirComics[fileIndex - 1]);
    nextComic.onclick=function() {file.loader(nextSrc)};
    prevComic.onclick=function() {file.loader(prevSrc)};
    enable('nextComic')
    enable('prevComic')
  }
};
