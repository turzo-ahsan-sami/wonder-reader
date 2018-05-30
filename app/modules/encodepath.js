const os = require('os');
const path = require('path');

const encodepath = (filepath) => {
  let c;
  let newPath = '';
  const tempPath = filepath.split(path.sep);
  // Encodes each folder, then merging it all together
  switch (os.platform) {
    case 'win32':
      [c] = tempPath; // Saves letter drive information
      for (let j = 1; j < tempPath.length; j+1) {
        newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
      }
      // returns c:\path\to\file.cbz
      newPath = path.join(c, newPath);
      return newPath;
    default:
      for (let j = 0; j < tempPath.length; j+1) {
        newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
      }
      newPath = `/${newPath}`; // To set root folder
      newPath = newPath.replace(/'/g, '\\\''); // Fixes err with the character \'
      return newPath;
  }
};

export default encodepath;
