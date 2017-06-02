// directory.js merges directories within directories to then return a new path
const path = require('path');
const fs = require('fs');

// Allowable File Types
const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

// Returns a path of the extracted comic up until the first image file appears
exports.merge = (directory) => {
  let extractedFiles, filtered, filePath, validExtName, validPath;
  extractedFiles = fs.readdirSync(directory);
  filePath = path.join(directory, extractedFiles[0]);
  if (extractedFiles.length > 0) {
    while (fs.statSync(filePath).isDirectory()) {
      filtered = '';
      // Checks for valid image types
      validExtName = imgTypes.indexOf(
          path.extname(filePath).toLowerCase()
        ) > -1;
      // Checks if [i] is a directory
      validPath = fs.statSync(filePath).isDirectory();
      // Pushes [i] to array for merging paths
      if (validExtName || validPath) { filtered = extractedFiles[0]; }
      directory = path.join(directory, filtered);
      extractedFiles = fs.readdirSync(directory);
      filePath = path.join(directory, extractedFiles[0]);
    }
  }
  return directory;
};

// Splits a path, encodes each index, and merges it all for a URI compatible file path.
exports.encode = (oldPath) => {
  let c;
  let newPath = '';
  let tempPath = oldPath.split(path.sep); // Breaks path into array

  // Encodes each folder, then merging it all together
  switch (process.platform) {
    case 'win32':
      c = tempPath[0]; // Saves letter drive information
      for (let j = 1; j < tempPath.length; j++) {
        newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
      }
      newPath = path.join(c, newPath); //returns c:\path\to\file.cbz
      return newPath;
    default:
      for (let j = 0; j < tempPath.length; j++) {
        newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
      }
      newPath = `/${newPath}`; // To set root folder
      newPath = newPath.replace(/\'/g, '\\\''); // Fixes err with the character \'
      return newPath;
  }
};
