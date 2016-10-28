// Loads Functions onto previous and next buttons

const file = require('./file.js');
const fs = require('fs');
const path = require('path');

enable = (id) => {
  document.getElementById(id).disabled = false;
};
disable = (id) => {
  document.getElementById(id).disabled = true;
};

// Configures Next/Prev comic buttons
exports.load = (fileName) => {
  let baseName, filePath, dirContents, fileIndex, nextComic, prevComic, nextSrc, prevSrc;
  disable('nextComic');
  disable('prevComic');

  baseName = path.basename(fileName);
  filePath = path.dirname(fileName);
  dirContents = fs.readdirSync(filePath);

  dirComics = dirContents.filter(function(x,i) { return fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i]).toLowerCase()) > -1}); // Cleans out folders and non ['cbr', 'cbz'] files

  fileIndex = dirComics.indexOf(baseName); // Gets index position of file inside directory array

  nextComic = document.getElementById('nextComic');
  prevComic = document.getElementById('prevComic');

  if (dirComics.length > 1) {
    if (fileIndex <= 0) { // If loaded comic is first comic in directory
      nextSrc = path.join(filePath, dirComics[fileIndex + 1]);
      nextComic.onclick=function() {file.loader(nextSrc)};
      enable('nextComic');
    } else if (fileIndex >= dirComics.length -1) { // If loaded comic is the last comic in directory
      prevSrc = path.join(filePath, dirComics[fileIndex - 1]);
      prevComic.onclick=function() {file.loader(prevSrc)};
      enable('prevComic');
    } else { // If comic is somewhere in the middle of the directory array
      nextSrc = path.join(filePath, dirComics[fileIndex + 1]);
      prevSrc = path.join(filePath, dirComics[fileIndex - 1]);
      nextComic.onclick=function() {file.loader(nextSrc)};
      prevComic.onclick=function() {file.loader(prevSrc)};
      enable('nextComic');
      enable('prevComic');
    };
  } else {
    // Do nothing
  };
};
