// Loads Functions onto previous and next buttons

const file = require('./file.js');
const fs = require('fs');
const path = require('path');

// Function variable
let enable, disable;

enable = (id) => {
  document.getElementById(id).disabled = false;
};
disable = (id) => {
  document.getElementById(id).disabled = true;
};

const nextComic = document.getElementById('nextComic');
const prevComic = document.getElementById('prevComic');

// Configures Next/Prev comic buttons
exports.load = (fileName) => {
  let baseName, filePath, dirContents, comics, fileIndex, nextSrc, prevSrc;
  disable('nextComic');
  disable('prevComic');

  baseName = path.basename(fileName);
  filePath = path.dirname(fileName);
  dirContents = fs.readdirSync(filePath);

  // Cleans out folders and non ['cbr', 'cbz'] files
  comics = dirContents.filter(function (x, i) {
    return fs.statSync(path.join(filePath, dirContents[i])).isFile() && ['.cbr', '.cbz'].indexOf(path.extname(dirContents[i]).toLowerCase()) > -1;
  });

  // Gets index position of file inside directory array
  fileIndex = comics.indexOf(baseName);

  if (comics.length > 1) {
    if (fileIndex <= 0) { // If loaded comic is first comic in directory
      nextSrc = path.join(filePath, comics[fileIndex + 1]);
      nextComic.onclick = function () { file.loader(nextSrc); };
      enable('nextComic');
    } else if (fileIndex >= comics.length - 1) { // If loaded comic is the last comic in directory
      prevSrc = path.join(filePath, comics[fileIndex - 1]);
      prevComic.onclick = function () { file.loader(prevSrc); };
      enable('prevComic');
    } else { // If comic is somewhere in the middle of the directory array
      nextSrc = path.join(filePath, comics[fileIndex + 1]);
      prevSrc = path.join(filePath, comics[fileIndex - 1]);
      nextComic.onclick = function () { file.loader(nextSrc); };
      prevComic.onclick = function () { file.loader(prevSrc); };
      enable('nextComic');
      enable('prevComic');
    }
  } else {
    // Do nothing
  }
};
