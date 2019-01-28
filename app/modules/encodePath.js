const os = require('os');
const path = require('path');

const encodeUnix = tempPath => {
  let newPath = '';
  for (let j = 0; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  return `/${newPath}` // To set root folder
    .replace(/'/g, '\\\''); // Fixes err with the character \'
};

const encodeWin = tempPath => {
  let newPath = '';
  const c = tempPath[0];
  for (let j = 1; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  return path.join(c, newPath);
};

const encodePath = filepath => {
  const tempPath = filepath.split(path.sep);
  return os.platform === 'win32'
    ? encodeWin(tempPath)
    : encodeUnix(tempPath);
};

export default encodePath;
