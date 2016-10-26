// directory.js merges directories within directories to then return a new path

const path = require('path');
const fs = require('fs');

const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

// Returns a path of the extracted comic up until the first image file appears
exports.merge = (directory) => {
  let dirContents = fs.readdirSync(directory);
  let filtered = [];

  for(let i=0; i < dirContents.length; i++) {
    if( imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync(path.join(directory,dirContents[i])).isDirectory() ) {
      filtered.push(dirContents[i]);
    }
  };
  dirContents = filtered;

  if (dirContents.length > 0) {
    while ( fs.statSync(path.join(directory, dirContents[0])).isDirectory() ) {
      filtered = [];
      for(let i = 0; i < dirContents.length; i++) {
        if( imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync( path.join(directory,dirContents[i])).isDirectory() ) {
          filtered.push(dirContents[i]);
        };
      };
      directory = path.join(directory, filtered[0]);
      dirContents = fs.readdirSync(directory);
    };
  };
  return directory;
};

// Splits a path, encodes each index, and merges it all for a URI compatible file path
exports.encode = (oldPath) => {
  let newPath = '';
  let tempPath = oldPath.split(path.sep);

  if (process.platform != "win32") {
    for(let j=0; j < tempPath.length; j++) {
      newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
    };
    newPath = `/${newPath}`;
  } else {
    for(let j=1; j < tempPath.length; j++) {
      newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
    };
  };
  return newPath;
};
