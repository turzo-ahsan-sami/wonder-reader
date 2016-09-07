// directory.js merges directories within directories to then return a new path

var path = require('path');
var fs = require('fs');

var imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Allowable File Types

exports.fix = (directory) => {
  var dirContents = fs.readdirSync(directory);

  var filtered = [];

  for(i=0; i < dirContents.length; i++) {
    if(imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync(path.join(directory,dirContents[i])).isDirectory()) {
      filtered.push(dirContents[i]);
    }
  };

  dirContents = filtered;

  if (dirContents.length > 0) {
    while (fs.statSync(path.join(directory, dirContents[0])).isDirectory()) {
      for(i=0; i < dirContents.length; i++) {
        if(imgTypes.indexOf(path.extname(dirContents[i]).toLowerCase()) > -1 || fs.statSync(path.join(directory,dirContents[i])).isDirectory()) {
          filtered.push(dirContents[i]);
        }
      };
      directory = path.join(directory, encodeURIComponent(filtered[0]));
      dirContents = fs.readdirSync(path.join(directory));
    };
  };

  return directory
}
