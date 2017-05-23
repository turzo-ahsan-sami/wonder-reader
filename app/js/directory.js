// directory.js merges directories within directories to then return a new path

const path = require('path');
const fs = require('fs');

// Allowable File Types
const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

// Returns a path of the extracted comic up until the first image file appears
exports.merge = (directory) => {
  let extractedFiles = fs.readdirSync(directory);
  let filtered = [];

  for (let i = 0; i < extractedFiles.length; i++) {
    let validExtName = imgTypes.indexOf(path.extname(extractedFiles[i]).toLowerCase()) > -1;
    let validStat = fs.statSync(path.join(directory, extractedFiles[i])).isDirectory();
    if (validExtName || validStat) {
      filtered.push(extractedFiles[i]);
    }
  }
  extractedFiles = filtered;

  if (extractedFiles.length > 0) {
    while (fs.statSync(path.join(directory, extractedFiles[0])).isDirectory()) {
      filtered = [];
      for (let i = 0; i < extractedFiles.length; i++) {
        let validExtName = imgTypes.indexOf(path.extname(extractedFiles[i]).toLowerCase()) > -1;
        let validStat = fs.statSync(path.join(directory, extractedFiles[i])).isDirectory();
        if (validExtName || validStat) {
          filtered.push(extractedFiles[i]);
        }
      }
      directory = path.join(directory, filtered[0]);
      extractedFiles = fs.readdirSync(directory);
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
