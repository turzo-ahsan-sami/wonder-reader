const path = require('path');

module.exports = (file) => {
  return ['.cbr', '.cbz'].indexOf(path.extname(file).toLowerCase()) > -1;
};
