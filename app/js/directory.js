// directory.js merges directories within directories to then return a new path

const path = require('path');
const fs = require('fs');

const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

exports.merge = (directory) => {
  var dirContents = fs.readdirSync(directory);

  var filtered = [];

  for(i=0; i < dirContents.length; i++) {
    if( imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync(path.join(directory,dirContents[i])).isDirectory() ) {
      filtered.push(dirContents[i]);
    }
  };
  dirContents = filtered;

  if (dirContents.length > 0) {
    console.log(path.join(directory, dirContents[0]))
    while ( fs.statSync(path.join(directory, dirContents[0])).isDirectory() ) {
      filtered = [];
      for(i=0; i < dirContents.length; i++) {
        if( imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync( path.join(directory,dirContents[i])).isDirectory() ) {
          filtered.push(dirContents[i]);
        };
      };
      directory = path.join(directory, filtered[0]);
      dirContents = fs.readdirSync(path.join(directory));
    };
  };
  console.log(directory);
  return directory;
};

exports.encode = (oldPath) => {
  var newPath = '';
  var tempPath = oldPath.split(path.sep);

  if (process.platform != "win32") {
    for (var j=0; j < tempPath.length; j++) {
      newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
    };
    newPath = `/${newPath}`;
  } else {
    for (var j=1; j < tempPath.length; j++) {
      newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
    };
  };
  return newPath;
};
