// title.js: sets title to comic name

const path = require('path');

exports.load = (fileName) => {
  let file = path.basename(fileName, path.extname(fileName));
  document.title = `Wonder Reader : ${file}`;
};
