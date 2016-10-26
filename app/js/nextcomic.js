// Loads Functions onto previous and next buttons

const file = require('./file.js');
const fs = require('fs');
const path = require('path');

function enable(id) {
  document.getElementById(id).disabled = false;
};
function disable(id) {
  document.getElementById(id).disabled = true;
};

exports.load = (fileName) => {
  disable('nextComic');
  disable('prevComic');

  let baseName = path.basename(fileName);
  let filePath = path.dirname(fileName);
  let dirContents = fs.readdirSync(filePath);

  let dirComics = dirContents.filter(function(x,i) { return fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i]).toLowerCase()) > -1});

  let fileIndex = dirComics.indexOf(baseName); // Gets index position of file inside directory array

  let nextComic = document.getElementById('nextComic');
  let prevComic = document.getElementById('prevComic');

  if (dirComics.length > 1) {
    if (fileIndex <= 0) { // If loaded comic is first comic in directory
      let nextSrc = path.join(filePath, dirComics[fileIndex + 1]);
      nextComic.onclick=function() {file.loader(nextSrc)};
      enable('nextComic');
    } else if (fileIndex >= dirComics.length -1) { // If loaded comic is the last comic in directory
      let prevSrc = path.join(filePath, dirComics[fileIndex - 1]);
      prevComic.onclick=function() {file.loader(prevSrc)};
      enable('prevComic');
    } else { // If comic is somewhere in the middle of the directory array
      let nextSrc = path.join(filePath, dirComics[fileIndex + 1]);
      let prevSrc = path.join(filePath, dirComics[fileIndex - 1]);
      nextComic.onclick=function() {file.loader(nextSrc)};
      prevComic.onclick=function() {file.loader(prevSrc)};
      enable('nextComic');
      enable('prevComic');
    }
  } else {
    // Do nothing
  };
};
