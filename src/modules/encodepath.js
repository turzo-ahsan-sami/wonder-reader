const os = require('os');
const path = require('path');

const encodepath = (filepath) => {
  let c;
  let newPath = '';
  let tempPath = filepath.split(path.sep);
  // Encodes each folder, then merging it all together
  switch (os.platform) {
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
      newPath = newPath.replace(/'/g, '\\\''); // Fixes err with the character \'
      return newPath;
  }
};

export default encodepath;
