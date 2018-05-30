const os = require('os');
const path = require('path');

const encodepath = (filepath) => {
  let newPath = '';
  const tempPath = filepath.split(path.sep);
  // console.log('ecnoding')
  // Encodes each folder, then merging it all together
  if (os.platform === 'win32') {
    // Saves letter drive information
    const c = tempPath[0]; // eslint-disable-line
    for (let j = 1; j < tempPath.length; j++) { // eslint-disable-line
      newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
    }
    // returns c:\path\to\file.cbz
    newPath = path.join(c, newPath);
  } else {
    for (let j = 0; j < tempPath.length; j++) { // eslint-disable-line
      newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
    }
    newPath = `/${newPath}`; // To set root folder
    newPath = newPath.replace(/'/g, '\\\''); // Fixes err with the character \'
  }
  // console.log('newPath', newPath);
  return newPath;
};

export default encodepath;
