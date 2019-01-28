const os = require('os');
const path = require('path');

const encodeUnix = tempPath => {
  let newPath = '';
  for (let j = 0; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  newPath = `/${newPath}`; // To set root folder
  newPath = newPath.replace(/'/g, '\\\''); // Fixes err with the character \'
  return newPath;
};

const encodeWin = tempPath => {
  let newPath = '';
  const c = tempPath[0];
  for (let j = 1; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  newPath = path.join(c, newPath);
  return newPath;
};

const encodepath = filepath => {
  const tempPath = filepath.split(path.sep);
  return os.platform === 'win32' ? encodeWin(tempPath) : encodeUnix(tempPath);
};

export default encodepath;
